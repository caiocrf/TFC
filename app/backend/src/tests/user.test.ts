import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';


import { Response } from 'superagent';
import { userMock } from './mocks/index';
import UserModel from '../database/models/usersModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('test /login route', () => {
let chaiHttpResponse: Response;

beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userMock as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('should return 400 when missing email or passowrd', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: "admin@admin.com" });

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body.message).to.be.equals('All fields must be filled');
  });

  it('should return 401 when passing invalid email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "flamengo.com", password: "flamengotri"});

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Invalid email or password');
  });

  it('should return 401 when passing invalid password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "admin@admin.com", password: "flamengotri"});

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Invalid email or password');
  });

  it('should return 200 and the token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "admin@admin.com", password: "secret_admin"});

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body.token).to.be.string;
  });
});
