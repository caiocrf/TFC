import * as express from 'express';
import { Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderBoardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = express.Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.leaderboardHome(req, res),
);
leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.leaderboardAway(req, res),
);

export default leaderboardRouter;
