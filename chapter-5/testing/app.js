var express = require('express');
var logger = require('morgan');

var usersRouter = require('./routes/users.routes');
var articlesRouter = require('./routes/articles.routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/',(req,res) => {
    res.json({message :'hello'})
})
app.use('/api/v1', usersRouter);
app.use('/api/v1', articlesRouter);

module.exports = app;
