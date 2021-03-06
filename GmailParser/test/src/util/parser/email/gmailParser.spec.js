import should from 'should';

import TestDataQuery from '/../../src/db/testdataQuery';
import GooglePlayParser from '/../../src/util/parser/email/googleplay/googleplayParser';
import GmailParser from '/../../src/util/parser/email/gmailParser';
import Gmail from '/../../src/model/dto/gmail';

import GooglePlayService from '/../../src/service/googleplayService';

import GMAIL_SEARCH_QUERY from '/../../esources/static/GmailSearchQuery';

describe('GmailParser는', () => {
  describe('Gmail 검색 쿼리 리스트를 순회 한다.(지금은 json 형태로 저장, 나중에는 DB에 저장)', () => {

    describe('`googleplay`에서 온 메일에 대해서 테스트 한다.', () => {

      let GOOGLEPLAY_QUERYS;
      const googleplayQueryMap = new Map();

      before(async () => {
        GOOGLEPLAY_QUERYS = GMAIL_SEARCH_QUERY.q.googleplay;

        GOOGLEPLAY_QUERYS.forEach((elem) => {
          googleplayQueryMap.set(elem.category, elem.query);
        });
      });

      const googleplayMailMap = new Map();

      describe('쿼리에 맞게 테스트 데이터를 불러온다.', () => {
        it('성공 시', async () => {

          for (const elem of googleplayQueryMap) {
            const category = elem[0];
            const query = elem[1];

            const mail = await TestDataQuery.getByQ(query);

            googleplayMailMap.set(category, mail);
          }

        });
      });

      describe('테스트 데이터를 쿼리에 맞게 파싱한다.', () => {
        it('성공 시', async () => {

          const parsingResult = [];

          googleplayMailMap.forEach((value, key) => {
            switch (key) {
              case 'trial':
                value.some((testdata) => {
                  const GmailDTO = new Gmail();
                  const metadata = GmailParser.metadataParse(testdata, GmailDTO);

                  const result = GooglePlayParser.body1ParserOfTrial(metadata);

                  parsingResult.push(result);
                });
                break;
              case 'subscription':
                value.some((testdata) => {
                  const GmailDTO = new Gmail();
                  const metadata = GmailParser.metadataParse(testdata, GmailDTO);

                  const result = GooglePlayParser.body1ParserOfSubscribe(metadata);

                  parsingResult.push(result);
                });
                break;
              case 'renewal':
                value.some((testdata) => {
                  const GmailDTO = new Gmail();
                  const metadata = GmailParser.metadataParse(testdata, GmailDTO);

                  const result = GooglePlayParser.body1ParserOfRenewal(metadata);

                  parsingResult.push(result);
                });
                break;
            }
          });

          console.log(parsingResult);
        });
      });
    });

    describe('사용자의 이메일을 받아서 메일 파싱을 진행한다.', () => {

      const useremail = 'moneydogtest1@gmail.com';

      it('JSON 파일로 작성한 Gmail 쿼리 불러오기', () => {
        GooglePlayService.queryParsing(useremail);
      });
    });
  });
});
