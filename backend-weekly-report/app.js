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
var jwt = require("jsonwebtoken");
const checkAuth = require("./src/middleware/checkAuth");

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

app.use("/api/reports", checkAuth, reportRouter);
app.use("/api/rows", checkAuth, rowRouter);

app.use("/item", checkAuth, routes);
app.use("/api/reports/worker", checkAuth, reportWorkerRouter);

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

app.delete("/deletereportbyid", checkAuth, (req, res) => {
  sql = "";
});

app.get("/api/workers/getbycode/:code", checkAuth, (req, res) => {
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

app.get("/api/workers/getbyaction/:action", checkAuth, (req, res) => {
  let code = req.params.action;
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

app.post("/sendmailtogm", checkAuth, (req, res) => {
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

app.post("/sendResetEmail", checkAuth, (req, res) => {
  let date = new Date();
  date.setHours(date.getHours() + 3);
  let token_expire = date;

  let email = req.body.email;
  console.log("🚀 ~ file: app.js ~ line 2222228 ~ app.post ~ email", email);
  let sql = "select * from workers where worker_email = ? ";

  con.query(sql, [email], (err, worker) => {
    console.log("🚀 ~ file: app.js ~ line 102 ~ con.query ~ worker", worker);

    if (worker.length > 0) {
      crypto.randomBytes(127, (err, buf) => {
        let worker_name = worker[0].worker_name;
        let worker_surname = worker[0].worker_surname;
        let token = buf.toString("hex");

        let data = [token, token_expire, email];
        let update =
          "UPDATE workers SET token = ?, token_expire = ? WHERE worker_email = ?";

        con.query(update, data, (err, row) => {
          if (err) {
            res.json(err);
          } else {
            let mailSended = mailer.sendMailToWorker(
              email,
              `${worker_name} ${worker_surname} Şifre sıfırlama talebi`,
              `Şifre sıfırlama talebiniz alınmıştır. Şifrenizi sıfırlamak için <a href="http://10.41.150.67:4200/#/set-password/${token}"> TIKLAYINIZ</a>`
            );

            res.json({
              message: "Şifre sıfırlamanız için email gönderildi",
              resCode: 200,
            });
          }
        });
      });
    } else {
      res.json({
        message: "E mailiniz sistemimizde kayıtlı değildir",
        resCode: 400,
      });
    }
  });
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

  if (password == repassword) {
    password = crypto.createHash("md5").update(password).digest("hex");
    let data = [password, token, datenow];
    console.log("🚀 ~ file: app.js ~ line 15 ~ hash", password);
    let sql = `UPDATE workers SET password = ? WHERE token = ? AND ? < token_expire `;
    con.query(sql, data, (err, rows, fields) => {
      if (err) {
        responseModel.resCode = 400;
        responseModel.message = err.message;
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
app.post("/api/workers", checkAuth, function (req, res) {
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
    <br>Kullanıcı adı: ${username} <br>şifre:belirlemek için bu linke <a href="http://10.41.150.67:4200/#/set-password/${token}">tıklayınız</a>`;
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
  console.log("🚀 ~ file: app.js ~ line 257 ~ username", username);
  let password = request.body.password;
  console.log("🚀 ~ file: app.js ~ line 259 ~ password", password);
  password = crypto.createHash("md5").update(password).digest("hex");
  password = password.substring(0, 16);
  if (username && password) {
    let sql =
      "SELECT username, worker_name, worker_surname, id FROM workers where username = ? AND password = ?";
    con.query(sql, [username, password], function (err, worker, fields) {
      if (worker.length > 0) {
        const token = jwt.sign(
          {
            muuid: worker.worker_name,
            memail: worker.worker_email,
            cid: worker.id,
            admin: false,
          },
          "dvurising",
          {
            expiresIn: "2h",
          }
        );
        response.json({
          data: worker,
          message: "success",
          resCode: 200,
          token: token,
        });
      } else {
        response.json({
          data: null,
          message: "Kullanıcı adı veya şifre hatalı",
          resCode: 400,
          token: "oluşturulmadı",
        });
      }
      response.end();
    });
  } else {
    response.json({
      data: null,
      message: "Kullanıcı adı veya şifre hatalı",
      resCode: 403,
      token: "oluşturulmadı",
    });
    response.end();
  }
});

app.post("/gmauth", function (request, response) {
  var username = request.body.username;
  let password = request.body.password;
  password = crypto.createHash("md5").update(password).digest("hex");
  password = password.substring(0, 16);
  if (username && password) {
    let sql =
      "SELECT username, claimant_name, claimant_surname, id FROM claimants where username = ? AND password=?";
    con.query(sql, [username, password], function (err, gm, fields) {
      if (gm.length > 0) {
        const token = jwt.sign(
          {
            muuid: gm.worker_name,
            memail: gm.worker_email,
            cid: gm.id,
          },
          "dvurising",
          {
            expiresIn: "2h",
          }
        );
        response.send({
          data: gm,
          message: "Giriş başarılı",
          resCode: 200,
          token: token,
        });
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

app.get("/api/claimants", checkAuth, (req, res) => {
  let sql = "SELECT claimant_name, claimant_surname FROM claimants";

  con.query(sql, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row);
    res.send(row);
  });
});

app.get("/getWorkerByReport/:report_id", (req, res) => {
  let report_id = parseInt(req.params.report_id);
  console.log("🚀 ~ file: app.js ~ line 245 ~ app.get ~ report_id", report_id);

  let sql = `
  select r.id, wee.week_id, w.worker_name, w.worker_surname, w.worker_email from workers w 
  inner JOIN reports r ON r.worker_id = w.id 
  Left join weeks wee ON r.week_id = wee.id
  left JOIN report_row_entries rre ON rre.report_id = r.id where r.id = ?
  `;

  con.query(sql, [report_id], (err, row, fields) => {
    console.log("🚀 ~ file: app.js ~ line 254 ~ con.query ~ row", row);
    console.log("error: ", err);
    if (err) result(err, null);

    res.send(row);
  });
});

app.get("/api/reports/isreportsended/:id", checkAuth, (req, res) => {
  let id = req.params.id;
  console.log("**********************");
  let sql = "SELECT is_report_sended from reports where id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("🚀 ~ file: app.js ~ line 249 ~ con.query ~ row", row);

    if (err) result(err, null);

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row);
    res.send(row);
  });
});

app.get("/api/sendreport/:id", checkAuth, function (request, response) {
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
    response.send("Güncellenecek id ptalı");
    response.end();
  }
});

app.get("/api/sendbackreport/:id", checkAuth, function (request, response) {
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
