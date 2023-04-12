export interface IMatch{
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}

export interface NewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
