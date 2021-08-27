"use strict";

var con = require("./../../config/db");

// Report Object

var Report = function (report) {
  this.is_report_sended = report.is_report_sended;
  this.week_id = report.week_id;
  this.worker_id = report.worker_id;
  this.claimant_id = report.claimant_id;
  this.report_commit_date = report.report_commit_date;
  this.report_edit_date = report.report_edit_date;
};

// Define CRUD Operations Functions
Report.findByWorkerId = function (id, result) {
  let sql = `SELECT r.id, w.week_name, r.is_report_sended, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id
  WHERE worker_id = ?`;

  con.query(sql, id, (err, row, fields) => {
    console.log("error", err);
    if (err) result(err, null);
    result(null, row);
  });
};

Report.findById = function (id, result) {
  let sql = `SELECT r.id, w.week_name, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id`;

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, row);
  });
};

Report.findByCategoryId = function (id, result) {
  let sql = "SELECT * FROM reports WHERE id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

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
  let sql = `SELECT r.id,  r.is_report_sended, w.week_name, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id`;
  con.query(sql, (err, rows, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, rows);
  });
};

Report.create = function (newReport, result) {
	let data = [newReport.is_report_sended, newReport.week_id, newReport.worker_id, newReport.claimant_id, newReport.report_commit_date, newReport.report_edit_date];
	
  let sql =
  "INSERT INTO `reports` (`is_report_sended`, `week_id`, `worker_id`, `claimant_id`, `report_commit_date`, `report_edit_date`) VALUES (?, ?, ?, ?, ?, ?)";
	
	con.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
		if (err) result(err, null);
		
		result(null, row);
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
  let sql = `UPDATE reports SET code = ?, worker_id = ?, claimant_id = ?, report_row_entry_id = ?, report_commit_date = ?, report_edit_date = ? WHERE id = ?`;
  con.query(sql, data, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, row.affectedRows);
  });
};

Report.delete = function (id, result) {
  let sql = "DELETE FROM reports WHERE report_id = ?";

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, row.affectedRows);
  });
};

module.exports = Report;
