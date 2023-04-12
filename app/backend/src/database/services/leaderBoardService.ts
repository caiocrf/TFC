import { ModelStatic } from 'sequelize';
import Teams from '../models/teamsModel';
import Match from '../models/matchModel';
import IResponse from '../interfaces/response';
import ILeaderBoard from '../interfaces/leaderBoard';

const countElements = (string: string, arr: string[]) =>
  arr.filter((res) => res === string).length;

const getMatchResults = (matche: Match[]) =>
  matche.map((m) => {
    if (m.homeTeamGoals > m.awayTeamGoals) {
      return 'victory';
    } if (m.homeTeamGoals === m.awayTeamGoals) {
      return 'draw';
    }
    return 'loss';
  });

const ranking = (team: Teams, result: string[], matche: Match[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matche.forEach((m) => {
    goalsFavor += m.homeTeamGoals;
    goalsOwn += m.awayTeamGoals;
  });

  return {
    name: team.teamName,
    totalPoints: countElements('victory', result) * 3 + countElements('draw', result),
    totalGames: matche.length,
    totalVictories: countElements('victory', result),
    totalDraws: countElements('draw', result),
    totalLosses: countElements('loss', result),
    goalsFavor,
    goalsOwn,

  };
};

class LeaderboardService {
  private team: ModelStatic<Teams> = Teams;
  private match: ModelStatic<Match> = Match;

  async leaderboardHome(): Promise<IResponse> {
    const [teams, match] = await Promise.all([
      this.team.findAll(),
      this.match.findAll({
        where: { inProgress: false } }),
    ]);

    const result: ILeaderBoard[] = teams.map((t) => {
      const matche = match.filter((m) => m.homeTeamId === t.id);
      const results = getMatchResults(matche);
      return ranking(t, results, matche);
    });

    return LeaderboardService.successResponse(200, result);
  }

  async leaderboardAway(): Promise<IResponse> {
    const [teams, match] = await Promise.all([
      this.team.findAll(),
      this.match.findAll({
        where: { inProgress: false } }),
    ]);

    const result: ILeaderBoard[] = teams.map((t) => {
      const matche = match.filter((m) => m.awayTeamId === t.id);
      const results = getMatchResults(matche);
      return ranking(t, results, matche);
    });

    return LeaderboardService.successResponse(200, result);
  }

  private static successResponse(status: number, message: unknown): IResponse {
    return { status, message };
  }
}

export default LeaderboardService;
