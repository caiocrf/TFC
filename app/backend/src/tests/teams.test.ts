import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import TeamModel from '../database/models/teamsModel';
import { teamsMock } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('test /teams route', () => {
let chaiHttpResponse: Response;
it('test getAllTeams function in /teams', async () => {
 sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
 chaiHttpResponse = await chai.request(app).get('/teams');

 expect(chaiHttpResponse.status).to.be.equals(200);
 expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
 (TeamModel.findAll as sinon.SinonStub).restore();
})
it('test getTeamById in /teams:id', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(teamsMock[0] as TeamModel);
    chaiHttpResponse = await chai.request(app).get('/teams/7');
   
    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0]);
    (TeamModel.findOne as sinon.SinonStub).restore();
   })

});
