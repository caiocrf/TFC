import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matchModel';
import { matchMock } from './mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('test /matches route', () => {

 let chaiHttpResponse: Response;

 it('get all matches', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchMock as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchMock);

    (Match.findAll as sinon.SinonStub).restore();
  });
});