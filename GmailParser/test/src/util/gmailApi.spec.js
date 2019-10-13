import '@babel/polyfill';

import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';
import GmailSearchQuery from '../../../src/resources/static/GmailSearchQuery.json';

describe('Gmail API 사용하기', () => {
  const useremail = 'dudrnxps1@gmail.com';
  const refreshToken = process.env.REFRESH_TOKEN_SAMPLE;

  const messageList = [];
  let auth;

  describe('사용자의 `refresh token 으로 API 사용', () => {
    it('#getMessageList', (done) => {

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_API_CLIENT_ID,
        process.env.GOOGLE_API_CLIENT_SECRET,
        process.env.GOOGLE_API_REDIRECT_URL,
      );

      oauth2Client.setCredentials({ refresh_token: refreshToken });
      auth = oauth2Client;

      google.gmail({ version: 'v1', auth: oauth2Client })
        .users.messages.list({ 'userId': useremail, 'q': GmailSearchQuery.apple })
        .then((result) => {
          assert.equal(result.status, 200);
          assert.equal(result.statusText, 'OK');

          result.data.messages.map((info) => {
            messageList.push(info.id);
          });

          done();
        })
        .catch((err) => {
          throw done(err);
        });
    });
  });

  describe('Message 목록으로 내용 가져오기', () => {
    it('getMessage', (done) => {
      const gmail = google.gmail({ version: 'v1', auth: auth });

      messageList.some(async (message) => {
        const result = await gmail.users.messages.get({ 'userId': useremail, 'id': message });

        if (message !== result.data.id) throw done(err);
      });
      
      done();
    });
  });
});
