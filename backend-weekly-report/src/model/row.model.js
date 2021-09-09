"use strict";

var con = require("./../../config/db");

// Row Object

var Row = function (row) {
  (this.report_id = row.report_id),
    (this.checked_by_admin = row.checked_by_admin),
    (this.matter = row.matter),
    (this.start_date = row.start_date),
    (this.finish_date = row.finish_date),
    (this.is_timeout = row.is_timeout),
    (this.scheduled_completion_date = row.scheduled_completion_date),
    (this.weekly_time_spent = row.weekly_time_spent),
    (this.status = row.status),
    (this.comments = row.comments),
    (this.actions = row.actions),
    (this.claimants = row.claimants);
};

Row.findByReport = function (id, result) {
   let sql = `SELECT r.id,s.checked_by_admin, s.code, wee.week_id, s.code, s.matter, s.start_date, s.finish_date, s.actions, s.claimants, s.scheduled_completion_date, s.is_timeout, s.weekly_time_spent, s.status, s.comments, s.id
  FROM report_row_entries s
  INNER JOIN reports r ON s.report_id = r.id
  INNER JOIN workers w ON r.worker_id = w.id 
  INNER JOIN claimants c ON r.claimant_id = c.id
  INNER JOIN weeks wee ON r.week_id = wee.week_id
  WHERE r.id = ?;`;
  
  con.query(sql, id, (err, row, fields) => {
    
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

// Define CRUD Operations Functions
Row.findByWorkerId = function (id, result) {
  let sql = "SELECT * FROM reports where worker_id = ?";
  console.log("🚀 ~ file: row.model.js ~ line 44 ~ sql", sql)

  con.query(sql, id, (err, row, fields) => {
    console.log("error", err);
    if (err) result(err, null);
    console.log(row);
    result(null, row);
  });
};

Row.findByCategoryId = function (id, result) {
  console.log("içerdeyim");
  let sql = "SELECT * FROM reports WHERE id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};

// Row.findByName = function (name, result) {
// 	let sql = 'SELECT * FROM reports WHERE item_name = ?';

// 	con.query(sql, name, (err, rows, fields) => {
// 		console.log("error: ", err);
// 		if (err) result(err, null);

// 		console.log('rows: ', rows);
// 		result(null, rows);
// 	});
// };

Row.findAll = function (result) {
  let sql = "SELECT * FROM reports";

  con.query(sql, (err, rows, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(rows);
    result(null, rows);
  });
};

Row.create = function (newRow, result) {
  console.log("gelen create istenen data");
  console.log(newRow);

  //-----------
  // var commit_date = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var yesterday = dd-1;
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();
  // today = mm + "/" + dd + "/" + yyyy;
  //-----------

  let code = Math.floor(100000 + Math.random() * 10000000);
  let data = [
    code,
    newRow.matter,
    newRow.start_date,
    newRow.finish_date,
    newRow.is_timeout,
    newRow.scheduled_completion_date,
    newRow.weekly_time_spent,
    newRow.status,
    newRow.comments,
    newRow.actions,
    newRow.claimants,
    newRow.report_id,
  ];
  console.log("🚀 ~ file: row.model.js ~ line 118 ~ data", data);

  let sql = `INSERT INTO report_row_entries
 (code, matter, start_date, finish_date, is_timeout, scheduled_completion_date, weekly_time_spent, status, comments, actions, claimants, report_id) VALUES 
 (?,?,?,?,?,?,?,?,?,?,?,?);`;

  con.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, data);
  });
};

Row.update = function (report, result) {
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

Row.delete = function (code, result) {
  let sql = "DELETE FROM report_row_entries WHERE code = ?";

  con.query(sql, code, (err, row, fields) => {
    if (err) result(err, null);

     
      result(null, code);
      
  });
};

module.exports = Row;
