# MoneyDog

### Introduction

- 본 프로젝트는 구독 서비스 시대에 구독 서비스를 한눈에 보여주고, 저렴하게 이용하는 방법 제안을 통해 경제적인 구독 서비스를 제안하는 서비스입니다.
- MoneyDog의 유래는 가짜뉴스를 잡는 NewsDog의 유래에서 사용자의 돈을 지켜준다는 의미입니다.

### Install

```
$ npm install
$ cd projectDirectory/client
$ npm run dev
```

### Features

- 사용하는 구독서비스를 한눈에 조회하고 표시
- Gmail API를 활용해서 Google Play, Appstore를 통해 가입한 구독서비스 조회
- 사용하고 있는 구독 서비스에 대해 더 싸게 이용할 수 있는 방법 제안(향후예정)
- 최근에 뜨고 있는, 구독 서비스 Top10 등 다양한 구독 정보 조회(향후예정)

### System Design

## ![moneyDog_system](https://user-images.githubusercontent.com/9483824/63221294-dc4efb00-c1d1-11e9-806f-61ef50099e1a.png)

- 현재까지 gmail 유저만 사용이 가능
- 구독 서비스 조회 버튼 => gmail api 권한 요청 => google, apple 등에서 날라온 영수증 조회 => 파싱 => dashboard페이지에 목록 조회 기능으로 구성(현재)
- Goolge Style ESLint 기준으로 개발

### Contibutor

#### 김재연

- Gmail api를 활용해서 Apple, Google로부터 오고, 구독 서비스의 영수증 조회 개발
- Cheerio를 활용해서 Apple, Google의 구독 영수증에 대한 Parser개발(결제에 대한 정보)
- Report page 개발
- Devops(backend)

#### 박영환

- 외부 API요청에 대한 서버개발
- Goolge OAuth2.0 api 토큰 요청 및 관리 서버 개발
- SubscriptionList 페에지 개발
- Devops(api)

#### 정성연

- Dashboard, Index페이지 등 Front-End전반적인 개발
- Circle CI와 연동
- Devops(Front)
