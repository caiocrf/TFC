import teamsModel from '../models/teamsModel';

class TeamService {
  public getAllTeams = async (): Promise<teamsModel[]> => {
    const allTeams = await teamsModel.findAll();
    return allTeams;
  };
}

export default TeamService;
