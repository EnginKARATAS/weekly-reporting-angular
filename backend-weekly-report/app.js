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
// const authRouter = require('./src/route/auth.route')

app.use("/api/reports", reportRouter);
app.use("/api/rows", rowRouter);
// app.use('/auth', authRouter)

app.use("/item", routes);
app.use("/api/reports/worker", reportWorkerRouter);


server.listen(port, () => {
  console.log("Listening on port: " + port);
});

const validatePayloadMiddleware = (req,res, next) => {
  console.log("**********************")
  console.log(req.session.page_views)
  if (req.body) 
  next();
  else{
    res.status(403).send({
      errorMessage: "you need a payload"
    })
  }
}


app.post("/auth",validatePayloadMiddleware, function (request, response) {
  request.session.test2 = "hello world";
  console.log("🚀 ~ file: app.js ~ line 46 ~ req.session.test2", request.session)

  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    let sql =
      "SELECT username, password, id FROM workers where username = ? AND password=?";
    con.query(sql, [username, password], function (error, results, fields) {
      if (results.length > 0) {
        console.log("🚀 ~ file: app.js ~ line 64 ~ results.length", results.length)
        request.session.loggedin = true;
        request.session.username = username;

        response.redirect("/all-reports");
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
