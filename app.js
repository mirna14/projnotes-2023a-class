var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// Library to log http communication
var logger = require('morgan');

//importing subroutes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter =  require('./routes/api');

//We are craeting the express instance 
var app = express();

// view engine setup
// We are delcaring the localization of the views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//que es app es una instancia de express
//Register midleware
// app.use ((req,res,next) => {
// console.log("✌ se ha recivido una peticion");
// next();
// });
// app.use((req,res,next)=>{
//   console.log(`🙌 IP: ${req.ip}`);
//   next();
// }); 

//Log all received requests
app.use(logger('dev'));
// Parse request data into json
app.use(express.json());
// Decode url info
app.use(express.urlencoded({ extended: false }));
//Parse client cookies into json
app.use(cookieParser());
// Set up the static file server
app.use(express.static(path.join(__dirname, 'public')));


// Registering routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
