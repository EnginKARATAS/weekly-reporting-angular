const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
const server = require("http").Server(app);
const port = process.env.PORT || 4000;
const con = require("./config/db");
const mailer = require("./src/mailSender/sender");
const crypto = require("crypto");

let host = "req.headers.host";

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

app.delete("/deletereportbyid", (req, res) => {
  sql = "";
});

app.get("/api/workers/getbycode/:code", (req, res) => {
  let code = req.params.code;
  sql = `SELECT worker_email, worker_name, worker_surname FROM workers w INNER JOIN
         reports ro ON w.id = ro.worker_id INNER JOIN
         report_row_entries rre ON rre.report_id = ro.id
         WHERE code = ?
  `;
  con.query(sql, code, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/sendmailtogm", (req, res) => {
  let mailSended = mailer.sendMailToGeneralManager(
    req.body.general_manager_email,
    req.body.subject,
    req.body.html
  );
  if (mailSended) {
    res.status(200).send("email general manager epostasına gönderildi");
    res.end();
  } else {
    res.status(400).send("email gönderilirken hata oluştu");
    res.end();
  }
});
app.post("/sendmailtoworker", (req, res) => {
  let mailSended = mailer.sendMailToWorker(
    req.body.worker_email,
    req.body.subject,
    req.body.html
  );
  if (mailSended) {
    res.status(200).send("email general manager epostasına gönderildi");
    res.end();
  } else {
    res.status(400).send("email gönderilirken hata oluştu");
    res.end();
  }
});

app.put("/setpassword", (req, res) => {
  let token = req.body.token;
  let password = req.body.password;
  let repassword = req.body.repassword;

  let responseModel = {
    token: token,
    password: password,
    repassword: repassword,

    message: "",
    resCode: 0,
  };

  let datenow = Date();
  let data = [password, token, datenow];

  if (password == repassword) {
    let sql = `UPDATE workers SET password = ? WHERE token = ? AND ? < token_expire `;
    con.query(sql, data, (err, rows, fields) => {
      if (err) {
        responseModel.resCode = 400
        responseModel.message = err.message
        res.send(responseModel);
      }
      responseModel.message =
        "Şifre değiştirme başarılı. Lütfen giriş yapınız.";
      responseModel.resCode = 200;
      res.send(responseModel);
    });
  } else {
    responseModel.message = "Şifreler uyuşmamaktadır.";
    responseModel.resCode = 400;
    res.json(responseModel);
  }
});

//create a worker via GM
app.post("/api/workers", function (req, res) {
  crypto.randomBytes(127, (err, buf) => {
    if (err) {
      // Prints error
      return;
    }
    // Prints random bytes of generated data

    let worker_name = req.body.worker_name;
    let worker_surname = req.body.worker_surname;
    let worker_email = req.body.worker_email;
    let job_title = req.body.job_title;
    let username = req.body.username;
    let token = buf.toString("hex");

    let date = new Date();
    date.setHours(date.getHours() + 3);
    let token_expire = date;

    let subject = "Katana Reporting Kaydı!";
    let html = `Değerli çalışanımız, katana reporting uygulamasına davet edildiniz. Dilerseniz aşağıdaki linke tıklayark şifrenizi belirleyebilirsiniz
    <br>Kullanıcı adı: ${username} <br>şifre:belirlemek için bu linke <a href="http://localhost:4200/set-password/${token}">tıklayınız</a>`;
    // ${req.headers.host}
    let data = [
      worker_name,
      worker_surname,
      job_title,
      worker_email,
      username,
      token,
      token_expire,
    ];
    if (true) {
      let sql = `INSERT INTO workers (worker_name, worker_surname, job_title, worker_email, username, token, token_expire) VALUES (?, ? , ?, ?, ?, ?, ?)`;
      con.query(sql, data, function (error, results, fields) {
        res.send(results);
        mailer.sendMailToWorker(worker_email, subject, html);
        res.end();
      });
    } else {
      res.send("girdiler geçersizdir.");
      res.end();
    }
  });
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    let sql =
      "SELECT username, worker_name, worker_surname, id FROM workers where username = ? AND password=?";
    con.query(sql, [username, password], function (err, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send(err);
      }
      response.end();
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/gmauth", function (request, response) {
  request.session.test = "asdsadsa";
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    let sql =
      "SELECT username, claimant_name, claimant_surname, id FROM claimants where username = ? AND password=?";
    con.query(sql, [username, password], function (err, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send(err);
      }
      response.end();
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/api/claimants", (req, res) => {
  let sql = "SELECT claimant_name, claimant_surname FROM claimants";

  con.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row);
    res.send(row);
  });
});

app.get("/api/reports/isreportsended/:id", (req, res) => {
  let id = req.params.id;
  console.log("**********************");
  let sql = "SELECT is_report_sended from reports where id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row);
    res.send(row);
  });
});

app.get("/api/sendreport/:id", function (request, response) {
  let report_id = request.params.id;
  if (report_id > 0) {
    let sql = `UPDATE reports SET is_report_sended = 1 WHERE id = ?; `;
    con.query(sql, report_id, function (error, results, fields) {
      if (report_id) {
        response.send(results);
      } else {
        response.send("Güncelleme başarısız");
      }
      response.end();
    });
  } else {
    response.send("Güncellenecek id hatalı");
    response.end();
  }
});

app.get("/api/sendbackreport/:id", function (request, response) {
  let report_id = request.params.id;
  console.log("🚀 ~ file: app.js ~ line 252 ~ report_id", report_id);
  if (report_id > 0) {
    let sql = `UPDATE reports SET is_report_sended = 0 WHERE id = ?; `;
    con.query(sql, report_id, function (error, results, fields) {
      if (report_id) {
        response.send(results);
      } else {
        response.send("Güncelleme başarısız");
      }
      response.end();
    });
  } else {
    response.send("Güncellenecek id hatalı");
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
