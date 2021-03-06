var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var createEventRouter = require('./routes/createEvent');
var eventsRouter = require('./routes/events');
var authRouter = require('./routes/auth');
var attendEventRouter = require('./routes/attendEvent');
var userEventsRouter = require('./routes/userEvents');
var checkUniqueUsernameRouter = require('./routes/checkUniqueUsername');
var unattendEventRouter = require('./routes/unattendEvent');
var deleteEventRouter = require('./routes/deleteEvent');
var editEventRouter = require('./routes/editEvent');

var app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/createEvent', createEventRouter);
app.use('/events', eventsRouter);
app.use('/auth', authRouter);
app.use('/attendEvent', attendEventRouter);
app.use('/userEvents', userEventsRouter);
app.use('/checkUniqueUsername', checkUniqueUsernameRouter);
app.use('/unattendEvent', unattendEventRouter);
app.use('/deleteEvent', deleteEventRouter);
app.use('/editEvent', editEventRouter);

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
