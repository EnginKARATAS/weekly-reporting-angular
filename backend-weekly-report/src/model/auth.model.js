"use strict";

var con = require("./../../config/db");

// Auth Object

var Auth = function (report) {
  this.id = report.id;
  this.code = report.code;
  this.worker_id = report.worker_id;
  this.claimant_id = report.claimant_id;
  this.report_row_entry_id = report.report_row_entry_id;
  this.report_commit_date = report.report_commit_date;
  this.report_edit_date = report.report_edit_date;
  this.week_name = report.week_name;
  this.worker = report.worker;
};

// Define CRUD Operations Functions
Auth.login = function ({username,password, request}, result) {
  
  let sql = "SELECT username, password, id FROM workers where username = ? AND password=?";

  con.query(sql, [username, password], (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    request.session.loggedin = true;
    request.session.username = username;
    request.session.id = id;

    console.log("🚀 ~ file: auth.model.js ~ line 32 ~ con.query ~ row", row)
    result(null, row);
  });
};

Auth.findById = function (id, result) {
  console.log("🚀 ~ file: report.model.js ~ line 35 ~ id", id);
  let sql = `SELECT r.id, w.week_name, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id`;

  console.log("içerdeyim");
  console.log(id);

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

Auth.findByCategoryId = function (id, result) {
  console.log("içerdeyim");
  let sql = "SELECT * FROM reports WHERE id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

// Auth.findByName = function (name, result) {
// 	let sql = 'SELECT * FROM reports WHERE item_name = ?';

// 	con.query(sql, name, (err, rows, fields) => {
// 		console.log("error: ", err);
// 		if (err) result(err, null);

// 		console.log('rows: ', rows);
// 		result(null, rows);
// 	});
// };

Auth.findAll = function (result) {
  let sql = `SELECT r.id, w.week_name, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id`;

  con.query(sql, (err, rows, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(rows);
    result(null, rows);
  });
};

Auth.create = function (newItem, result) {
  console.log("gelen create istenen data");
  console.log(newItem);

  let code = Math.floor(100000 + Math.random() * 900000);
  //-----------
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var yesterday = dd-1;
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();
  // today = mm + "/" + dd + "/" + yyyy;
  //-----------

  let data = [
    code,
    newItem.worker_id,
    newItem.claimant_id,
    newItem.report_row_entry_id,
    newItem.report_commit_date,
    newItem.report_edit_date,
  ];
  // let sql = 'INSERT INTO reports(item_name, item_desc, item_price) VALUES(?, ?, ?)';
  let sql =
    "INSERT INTO reports (code, worker_id, claimant_id, report_row_entry_id, report_commit_date, report_edit_date) VALUES(?, ?, ?, ?, ?, ?)";

  con.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row.insertId);
    result(null, row.insertId);
  });
};

Auth.update = function (report, result) {
  let data = [
    report.code,
    report.worker_id,
    report.claimant_id,
    report.report_row_entry_id,
    report.report_commit_date,
    report.report_edit_date,
    report.id,
  ];
  console.log(data);
  let sql = `UPDATE reports SET code = ?, worker_id = ?, claimant_id = ?, report_row_entry_id = ?, report_commit_date = ?, report_edit_date = ? WHERE id = ?`;
  console.log(sql);
  con.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row.affectedRows);
    result(null, row.affectedRows);
  });
};

Auth.delete = function (id, result) {
  let sql = "DELETE FROM reports WHERE report_id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row.affectedRows);
    result(null, row.affectedRows);
  });
};

module.exports = Auth;
