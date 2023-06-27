import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { compareHash } from '../utils/utils';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

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
    res.send('You are succesfully registered');
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

    const token = jwt.sign(
      { userId: user?.id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXP },
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
