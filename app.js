var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Connect to database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('reynan2k13:chocobo12345@ds149437.mlab.com:49437/usercollection');

var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');
var adduser = require('./routes/adduser');
var about = require('./routes/about');
var resume = require('./routes/resume');
var login = require('./routes/login');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'asfasfa3asfa',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 2160000000
    }
}));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

app.use('/userlist', users);
app.post('/add', users);
app.post('/edituser', users);
app.post('/deluser', users);


app.use('/chat', chat);
app.post('/chat', chat);


app.use('/adduser', adduser);
app.post('/newuser', adduser);

app.use('/about', about);
app.use('/resume', resume);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
