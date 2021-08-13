var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);

var port = process.env.PORT || 4000;

// to support JSON-encoded bodies
app.use(bodyParser.json())

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

// Require item routes
const routes = require('./src/route/item.route')
const reportRouter = require('./src/route/report.route')

// using as middleware
app.use('/item', routes)

// using as middleware
app.use('/api/reports', reportRouter)

// root path
app.get("/", (req, res, next) => {
	res.json("What's up?");
});

server.listen(port, () => {
    console.log('Listening on port: ' + port);
});