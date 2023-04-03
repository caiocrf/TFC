import * as express from 'express';
import MatchController from '../controllers/matchController';
import Match from '../models/matchModel';
import Teams from '../models/teamsModel';
import MatchService from '../services/matchService';

const matchRouter = express.Router();
const matchService = new MatchService(Match, Teams);
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAllMatches);

export default matchRouter;
