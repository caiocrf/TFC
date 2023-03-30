import * as express from 'express';
import TeamRoutes from './database/routes/teamsRoute';
import UserRote from './database/routes/userRoute';

class App {
  public app: express.Express;
  private teamRoutes: TeamRoutes;
  private userRoutes: UserRote;

  constructor() {
    this.app = express();

    this.config();

    this.teamRoutes = new TeamRoutes();
    this.userRoutes = new UserRote();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', this.teamRoutes.teamRouter);
    this.app.use('/login', this.userRoutes.userRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
