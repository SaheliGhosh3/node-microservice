const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const routes1 = require('./routes/routes.js')(server, fs);
server.listen(3001, () => {
  console.log('JSON Server is running')
})