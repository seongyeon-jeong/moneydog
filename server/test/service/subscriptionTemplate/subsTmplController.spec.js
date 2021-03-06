import '@babel/polyfill';
import request from 'supertest';
import {assert} from 'chai';
import {mongoConnect, mongoDisConnect} from '../../../src/config/mongoDB';
import app from '../../../app';

describe('Subscription Template Controller Test', () => {
  let token;
  before((done) => {
    request(app)
      .post('/auth/signIn')
      .send({userInfo: {email: 'admin@fkii.org', password: '1234'}})
      .end((err, res) => {
        if (err) done(err);
        const json = JSON.parse(res.text);
        token = json.token;
        assert.isDefined(token, 'token is defined');
        done();
      });
  });
  it('GET /subs-tmpl 테스트하기', (done) => {
    request(app)
      .get('/subs-tmpl')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) throw err;
        const result = JSON.parse(res.text);
        assert.equal(201, result.status);
        assert.equal(8, result.message.length);
        done();
      });
  });
  after((done) => {
    mongoDisConnect();
    done();
  });
});
