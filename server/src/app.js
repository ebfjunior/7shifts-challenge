const app = require('express')();
const { json } = require('body-parser');
const routes = require('./router');

app.use(json());
app.use(routes);

module.exports = app;
