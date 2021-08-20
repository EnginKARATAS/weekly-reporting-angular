var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());
var server = require("http").Server(app);
var port = process.env.PORT || 4000;
var con = require("./config/db");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// to support JSON-encoded bodies
app.use(bodyParser.json());

const routes = require("./src/route/item.route");
const reportWorkerRouter = require("./src/route/reportWorker.route");

const reportRouter = require("./src/route/report.route");
const rowRouter = require("./src/route/row.route");
const { EDESTADDRREQ } = require("constants");
// const authRouter = require('./src/route/auth.route')

app.use("/api/reports", reportRouter);
app.use("/api/rows", rowRouter);
// app.use('/auth', authRouter)

app.use("/item", routes);
app.use("/api/reports/worker", reportWorkerRouter);

server.listen(port, () => {
  console.log("Listening on port: " + port);
});

const validatePayloadMiddleware = (req, res, next) => {
  console.log("**********************");
  console.log(req.session.page_views);
  if (req.body) next();
  else {
    res.status(403).send({
      errorMessage: "you need a payload",
    });
  }
};

app.get("/api/claimants", (req, res) => {
  console.log("**********************");
  let sql = "SELECT claimant_name, claimant_surname FROM claimants";

  con.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row);
    res.send(row);
  });
});

app.post("/auth", function (request, response) {
  console.log(
    "🚀 ~ file: app.js ~ line 58 ~ request.session.test2",
    request.session.test2
  );
  request.session.test = "asdsadsa";
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    let sql =
      "SELECT username, worker_name, worker_surname, id FROM workers where username = ? AND password=?";
    con.query(sql, [username, password], function (error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send("Incorrect Username and/or Password!");
      }
      response.end();
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/sec", (req, res) => {
  console.log(
    "🚀 ~ file: app.js ~ line 85 ~ app.get ~ req.session.test2",
    req.session.test2
  );
  req.session.test2++;
  res.send("sec " + req.session.test2);
});
app.get("/first", (req, res) => {
  req.session.test2 = 1;
  res.send("req.session.test2  " + req.session.test2);
});
