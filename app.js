const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// --- Initalize DB with dummy data --- //
const DB_INIT = require('./config/initializeDB');
const sequelize = require("./config/dbconfig");
let db;

sequelize.sync({
  force:false  //  IF YOU SET THIS TO FALSE, IT WONT RECREATE THE DATABASE
});
// Initialize db after 10 seconds
setTimeout(()=>{
  //db = DB_INIT();
  
},15000)


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
const reportRouter = require("./routes/asset/report");
const userRouter = require("./routes/users");
const insuranceFirmRouter = require("./routes/asset/insuranceFirm");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/auth', authRouter);
app.use('/users',userRouter);
app.use('/assets', assetsRouter);
app.use('/tps', tpsRouter);
app.use('/types', typeRouter);
app.use('/insurances',insuranceRouter);
app.use('/insurancefirms',insuranceFirmRouter);
app.use('/support',supportRouter);
app.use('/valuations',valuationRouter);
app.use('/disposals',disposalRouter);
app.use('/roles',roleRouter);
app.use('/reports',reportRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({msg:"Page Not Found"})
  console.log(err)
});

module.exports = app;
