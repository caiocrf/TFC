import { ModelStatic } from 'sequelize';
import Team from '../models/teamsModel';
import Match from '../models/matchModel';
import { IMatch, NewMatch } from '../interfaces/match';

export default class MatchService {
  private _matchModel: ModelStatic<Match>;
  private _teamModel: ModelStatic<Team>;

  constructor(
    matchModel: ModelStatic<Match>,
    teamModel: ModelStatic<Team>,
  ) {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public getAllMatches = async (): Promise<IMatch[]> => {
    const match = await this._matchModel.findAll(
      { include: [{
        model: this._teamModel,
        as: 'awayTeam',
      },
      {
        model: this._teamModel,
        as: 'homeTeam',
      }],
      },
    );
    return match;
  };

  public endMatch = async (id: number) => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const [updated] = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  };

  public createMatch = async (newMatch: NewMatch) => {
    const { homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals } = newMatch;
    const matchCreated = await
    this._matchModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return matchCreated.id;
  };

  public getById = async (id: number) => {
    const match = await Match.findByPk(id);
    return match;
  };
}
