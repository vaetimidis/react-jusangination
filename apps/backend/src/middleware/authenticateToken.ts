import type { NextFunction, Response } from 'express';
import type { AuthenticatedRequest, IUser } from '#/types/index';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '#/server';

// Middleware для проверки валидности токена
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Error validating token' });
      return;
    }
    req.user = user as IUser;
    next();
  });
}
