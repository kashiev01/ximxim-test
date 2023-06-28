import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { compareHash } from '../utils/utils';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { CustomRequest } from '../middleware/interfaces/request.interface';
import { JwtBlackList } from '../models/JwtBlackList.model';

dotenv.config();

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      throw new Error('This user already exists');
    }
    const newUser = await User.create({ ...req.body });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error('Invalid id');
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      throw new Error('Password not correct');
    }

    const access_token = jwt.sign(
      { userId: user?.id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXP },
    );
    const refreshToken = jwt.sign(
      { userId: user?.id },
      process.env.JWT_REFRESH_SECRET as Secret,
      { expiresIn: process.env.JWT_REFRESH_EXP },
    );

    res.status(200).json({
      success: true,
      access_token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let check_token;
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      check_token = await checkToken(token);
    }

    if (check_token) {
      res.send(`Your id is: ${req.userId}`);
    } else {
      throw new Error('Your token access_token is revoked');
    }
  } catch (error) {
    next(error);
  }
};

export const grantNewJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.refreshUserId;
    const access_token = jwt.sign(
      { userId },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: process.env.JWT_EXP,
      },
    );

    res.status(200).json({
      success: true,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const a = await JwtBlackList.findOne({ where: { token } });
    if (!token) {
      throw new Error('No access_token provided');
    }
    await JwtBlackList.create({ token, is_revoked: true });
    res.send('You are logged out');
  } catch (error) {
    next(error);
  }
};

export const checkToken = async (token: string): Promise<boolean> => {
  const expired_token = await JwtBlackList.findOne({ where: { token } });

  if (!expired_token) {
    return true;
  }
  return false;
};
