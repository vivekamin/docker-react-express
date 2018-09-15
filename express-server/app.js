var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoDB = 'mongodb://mongo:27017/myDB';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = require('bluebird');
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error:');
  console.log("Trying again to connect........");
  setTimeout(()=>{
    mongoose.connect(mongoDB);
  }, 1000);
  
});

db.on('connected', function() {
  //isConnectedBefore = true;
  console.log('======>Connection established to MongoDB<=======');
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, UPDATE, DELETE, PATCH');
      return res.status(200).json({})
  }
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.send('error');
});

module.exports = app;
