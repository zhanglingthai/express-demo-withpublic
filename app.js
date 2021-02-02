var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

//import router
var routers = require('./routes');
var user = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route setup
app.use('/', routers);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler

// development模式错误处理
if (app.get('env') === 'development') {
	console.log(app.get('env'))
    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = err;

        // render the error page
        res.status(err.status || 500);
        res.render('error', {
            title: err.status || 500,
            message: err.message,
            error: err
        });
    });
}

// production模式错误处理
app.use(function(err, req, res, next) {
	console.log(app.get('env'))
    res.locals.message = err.message;
    res.locals.error = {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: err.status || 500,
        message: err.message,
        error: ""
    });

});

module.exports = app;