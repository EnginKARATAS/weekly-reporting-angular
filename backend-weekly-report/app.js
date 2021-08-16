var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(cors())
var server = require('http').Server(app);
var port = process.env.PORT || 4000;
// to support JSON-encoded bodies
app.use(bodyParser.json())
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))



const routes = require('./src/route/item.route')
const reportWorkerRouter = require('./src/route/reportWorker.route')


const reportRouter = require('./src/route/report.route')
const rowRouter = require('./src/route/row.route')

app.use('/api/reports', reportRouter)
app.use('/api/rows', rowRouter)


app.use('/item', routes)
app.use('/api/reports/worker', reportWorkerRouter)




// root path
app.get("/", (req, res, next) => {
	res.json("What's up?");
});

server.listen(port, () => {
    console.log('Listening on port: ' + port);
});