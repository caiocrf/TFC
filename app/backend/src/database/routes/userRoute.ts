import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import validateLogin from '../midllewares/validateLogin';
import validateToken from '../midllewares/validateToken';

export default class LoginRoutes {
  public userRouter: express.IRouter;
  private userController: UserController;

  constructor() {
    this.userRouter = express.Router();

    this.userController = new UserController();

    this.userRouter.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => validateLogin(req, res, next),
      (req: Request, res: Response) => this.userController.login(req, res),
    );
    this.userRouter.get(
      '/role',
      (req: Request, res: Response, next: NextFunction) => validateToken(req, res, next),
      (req: Request, res: Response) => this.userController.userRole(req, res),
    );
  }
}
