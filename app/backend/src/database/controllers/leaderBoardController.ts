import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoardService';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async leaderboardHome(req: Request, res: Response) {
    const resp = await this.leaderboardService.leaderboardHome();
    res.status(resp.status).json(resp.message);
  }

  async leaderboardAway(req: Request, res: Response) {
    const resp = await this.leaderboardService.leaderboardAway();
    res.status(resp.status).json(resp.message);
  }
}

export default LeaderboardController;
