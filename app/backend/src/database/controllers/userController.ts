import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { compareSync } from 'bcryptjs';
import UserService from '../services/userService';

const { JWT_SECRET } = process.env;

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.user(email);
    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, JWT_SECRET as string, {
      expiresIn: '21d', algorithm: 'HS256',
    });
    return res.status(200).json({ token });
  };

  public userRole = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.user(email);
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    return res.status(200).json({ role: user.role });
  };
}

export default UserController;
