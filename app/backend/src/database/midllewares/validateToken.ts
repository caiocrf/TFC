import jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';

const { JWT_SECRET } = process.env;

type TypeEmail = {
  email: string,
};

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401)
      .json({ message: 'Token not found' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET as string) as TypeEmail;
    req.body.email = data.email;
  } catch (error) {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateToken;
