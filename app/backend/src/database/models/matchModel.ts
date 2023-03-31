import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
import Team from './teamsModel';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeMatch' });
Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam' });
Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayMatch' });
Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam' });

export default Match;
