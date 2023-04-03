import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  private _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  public getMatchesInProgress = async () => {
    const matches = await this._matchService.getAllMatches();
    return matches.filter((match) => match.inProgress === true);
  };

  public getMatchesNotInProgress = async () => {
    const matches = await this._matchService.getAllMatches();
    return matches.filter((match) => match.inProgress === false);
  };

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') return res.status(200).json(await this.getMatchesInProgress());
    if (inProgress === 'false') return res.status(200).json(await this.getMatchesNotInProgress());
    const match = await this._matchService.getAllMatches();
    res.status(200).json(match);
  };
}
