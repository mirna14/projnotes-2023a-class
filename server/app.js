//helps to handle http-errors
import createError from 'http-errors'
// Import the Express Library
import express from 'express';
// Is a Core-Node library to manage system paths
import path from 'path'
//Helps to parse client cookies
import cookieParser from 'cookie-parser';
// Library to log http communication
import logger from 'morgan';

//importing subroutes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import apiRouter from './routes/api';

//We are craeting the express instance 
const app = express();

// view engine setup
// We are delcaring the localization of the views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



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
app.use((req, res, next)  => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
