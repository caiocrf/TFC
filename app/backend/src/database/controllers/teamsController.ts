import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams();
    return res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getTemById(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamController;
