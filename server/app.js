const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Databases
const db = require('./db/mongoDB');

//MiddleWares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Api
const indexRouter = require('./api/index');
const usersRouter = require('./api/users');
const subscribeInfo = require('./api/subscribeInfo');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribeInfo', subscribeInfo);

// HTTP 접근 제어 혹은 CORS(Cross-origin resource sharing, 출처가 다른 곳끼리 자원 공유
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
