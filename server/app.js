import 'app-module-path/register';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import * as Sentry from '@sentry/node';

import authCheck from './src/security/jwtAuthentication';
import {mongoConnect} from './src/config/mongoDB';
import {customLogger, errorLogger, stream} from './src/config/winston';

// Error tracking
Sentry.init({dsn: 'https://566bd809b9a0464e8e690a199ab83396@sentry.io/1553162'});

const app = express();
dotenv.config();

// client
app.use(express.static('dist'));

// DB Config
mongoConnect();

// MiddleWares
app.use(cors());
app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Api
import indexRouter from './src/router';
import authRouter from './src/router/auth/authentiController';
import userRouter from './src/router/user/userController';
import subsInfoRouter from './src/router/subscriptiionInfo/subsInfoController';
import subsTmplRouter from './src/router/subscriptionTemplate/subsTmplController';
import alarmRouter from './src/router/alarm/alarmController';
import oAuth2Router from './src/router/auth/google/oAuth2Controller';

if (process.env.NODE_ENV !== 'test') {
  app.use(customLogger);
}
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/google', oAuth2Router);
app.use('/api/alarm', alarmRouter);
app.use(authCheck);
app.use('/api/users', userRouter);
app.use('/api/subs-info', subsInfoRouter);
app.use('/api/subs-tmpl', subsTmplRouter);


// error logger
app.use(errorLogger);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.end(res.sentry + '\n');
});

module.exports = app;
