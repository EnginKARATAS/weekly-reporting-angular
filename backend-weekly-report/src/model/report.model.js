"use strict";

var con = require("./../../config/db");

// Report Object

var Report = function (report) {
  this.id = report.id;
  this.code = report.code;
  this.worker_id = report.worker_id;
  this.claimant_id = report.claimant_id;
  this.report_row_entry_id = report.report_row_entry_id;
  this.report_commit_date = report.report_commit_date;
  this.report_edit_date = report.report_edit_date;
};

// Define CRUD Operations Functions
Report.findByWorkerId = function (id, result) {
  let sql =
  "SELECT * FROM reports where worker_id = ?";
  
  console.log("🚀 ~ file: report.model.js ~ line 20 ~ sql", sql)
    con.query(sql, id, (err, row, fields) =>{
      console.log("error", err);
      if (err) result(err, null)
      console.log(row)
      result(null, row)
    })
};

Report.findById = function (id, result) {
console.log("🚀 ~ file: report.model.js ~ line 35 ~ id", id)
  let sql = "SELECT * FROM reports WHERE id = ?";

  console.log("içerdeyim")
  console.log("içerdeyim")
  console.log(id)
  console.log("içerdeyim")

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

Report.findByCategoryId = function (id, result) {
  console.log("içerdeyim")
  let sql = "SELECT * FROM reports WHERE id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

// Report.findByName = function (name, result) {
// 	let sql = 'SELECT * FROM reports WHERE item_name = ?';

// 	con.query(sql, name, (err, rows, fields) => {
// 		console.log("error: ", err);
// 		if (err) result(err, null);

// 		console.log('rows: ', rows);
// 		result(null, rows);
// 	});
// };

Report.findAll = function (result) {
  let sql = "SELECT * FROM reports";

  con.query(sql, (err, rows, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(rows);
    result(null, rows);
  });
};

Report.create = function (newItem, result) {
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

Report.update = function (report, result) {
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

Report.delete = function (id, result) {
  let sql = "DELETE FROM reports WHERE report_id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row.affectedRows);
    result(null, row.affectedRows);
  });
};

module.exports = Report;
