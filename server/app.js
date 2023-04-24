import createError from 'http-errors'
// Import the Express Library
import express from 'express';
// Is a Core-Node library to manage system paths
import path from 'path'
// Helps to parse client cookies
import cookieParser from 'cookie-parser';
// Library to log http communication
import logger from 'morgan'

// Importing subroutes
import indexRouter from '@server/routes/index' 
import usersRouter from '@server/routes/users';
import apiRouter from '@server/routes/api';

//setting webpack modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackDevMiddleware from 'webpack-hot-middleware';
//importing webpack configuration
import webpackConfig from '../webpack.dev.config';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// We are creating the express instance
//const app = express();
const app = express();

//get the execution node
const nodeEnviroment = process.env.NODE_ENV || 'production'

//deciding if we add webpack middleware or not
if(nodeEnviroment === 'development'){
  //Start webpack dev server
  console.log("🏆Ejecutando modo desarrollo");
  // Adding the key "mode" with its value develoment
  webpackConfig.mode =nodeEnviroment;
  // Setting the port
  webpackConfig.devServer.port = process.env.port
  //setting up the HMR (Hot module replacement)
  webpackConfig.entry = ["webpack-hot-middleware/client?reload=true$timeout=1000",
  webpackConfig.entry
];
//creating the bundler
const bundle = webpack(webpackConfig);
// Enabling the webpack middleware
app.use(WebpackDevMiddleware(bundle, {
  publicPath: webpackConfig.output.publicPath
}));
// enabling the webpack hot HMR
app.use(WebpackHotMiddleware(bundle));
}else{
  console.log("🧧 Ejecutando en modo produccion🧧");
}

// view engine setup
// We are delcaring the localization of the views
app.set('views', path.join(__dirname, 'views'));
// Setting up the template engine
app.set('view engine', 'hbs');

// Registering middlewares
// Log all received requests
app.use(logger('dev'));
// Parse request data into json
app.use(express.json());
// Decode url info
app.use(express.urlencoded({ extended: false }));
// Parse client cookies into json
app.use(cookieParser());
// Set up the static file server
app.use(express.static(path.join(__dirname, '../public')));

// Registering routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));

})


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
