const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()
 
// server.use(middlewares)
// server.use(router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes1 = require('./routes/routes.js')(app);
app.listen(3001, () => {
  console.log('Server is running')
})