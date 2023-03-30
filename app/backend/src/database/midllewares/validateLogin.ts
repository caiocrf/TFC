import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400)
      .json({ message: 'All fields must be filled' });
  }
  const { error } = Joi.object({
    email: Joi.string().email().messages({ 'string.email': 'Invalid email or password' }),
    password: Joi.string().min(6).messages({ 'string.min': 'Invalid email or password' }),
  }).validate(req.body);

  if (error) {
    return res.status(401)
      .json({ message: error.message });
  }
  return next();
};

export default validateLogin;
