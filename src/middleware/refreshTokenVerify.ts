import jwt, { Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomRequest } from './interfaces/request.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export const verifyRefreshToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const refresh_token = req.body.refresh;

  try {
    if (!refresh_token) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }
    const decodedToken = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET as Secret,
    ) as JwtPayload;
    req.refreshUserId = decodedToken.userId;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
