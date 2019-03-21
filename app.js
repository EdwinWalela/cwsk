const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

//Assets Module
const assetsRouter = require('./routes/asset/assets');
const tpsRouter = require('./routes/asset/tps');
const typeRouter = require('./routes/asset/type');
const insuranceRouter = require('./routes/asset/insuarance');
const supportRouter = require('./routes/asset/support');
const valuationRouter = require('./routes/asset/valuation');
const disposalRouter = require('./routes/asset/disposal');
const roleRouter =require("./routes/asset/roles");


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/assets', assetsRouter);
app.use('/tps', tpsRouter);
app.use('/types', typeRouter);
app.use('/insurances',insuranceRouter);
app.use('/support',supportRouter);
app.use('/valuations',valuationRouter);
app.use('/disposals',disposalRouter);
app.use('/roles',roleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next(createError(404));
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
