var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('./db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.route');
const mongoRouter = require('./routes/mongo');
const productRouter = require('./routes/product.route');
const projectRouter = require('./routes/task.route');

mongo();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mongo',mongoRouter);
app.use('/products', productRouter);
app.use('/tasks', projectRouter);

module.exports = app;
