import { Request, Response } from 'express';
import MatchService from '../services/matchService';
import TeamService from '../services/teamsService';

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

  public endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._matchService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this._matchService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json(match);
  };

  public createMatches = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const teamService = new TeamService();
    const homeTeam = await teamService.getTemById(homeTeamId);
    const awayTeam = await teamService.getTemById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const createMatch = await this._matchService.createMatch(req.body);
    const newMatch = await this._matchService.getById(createMatch);
    return res.status(201).json(newMatch);
  };
}
