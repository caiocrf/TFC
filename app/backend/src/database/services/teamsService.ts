import teamsModel from '../models/teamsModel';

class TeamService {
  public getAllTeams = async (): Promise<teamsModel[]> => {
    const allTeams = await teamsModel.findAll();
    return allTeams;
  };

  public getTemById = async (id: number) => {
    const team = await teamsModel.findOne({ where: { id } });
    return team;
  };
}

export default TeamService;
