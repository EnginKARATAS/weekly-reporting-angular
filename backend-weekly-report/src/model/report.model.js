"use strict";

var con = require("./../../config/db");

// Report Object

var Report = function (report) {
  this.week_id = report.week_id;
  this.week_name = report.week_name;
  this.is_report_sended = report.is_report_sended;
  this.worker_id = report.worker_id;
  this.claimant_id = report.claimant_id;
  this.report_commit_date = report.report_commit_date;
  this.report_edit_date = report.report_edit_date;
};

// Define CRUD Operations Functions
Report.findByWorkerId = function (id, result) {
  let sql = `SELECT r.id, w.week_name, w.week_id, r.is_report_sended, concat(wo.worker_name, ' ', wo.worker_surname) as worker 
  FROM reports r 
   INNER JOIN weeks w ON r.week_id = w.id
   LEFT JOIN workers wo ON r.worker_id = wo.id
   WHERE r.worker_id = ?`;

  con.query(sql, id, (err, rows, fields) => {
    console.log("error", err);
    if (err) result(err, null);
    result(null, rows);
  });
};

Report.findAll = function (result) {
  let sql = `SELECT r.id,  r.is_report_sended, w.week_name, w.week_id, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id`;
  con.query(sql, (err, rows, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    result(null, rows);
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

let ResponseModel = function () {
  (this.message = ""), (this.resCode = 0);
};
Report.create = function (newReport, result) {
  let rspc = { ...ResponseModel };
  let checkData = [newReport.worker_id, newReport.week_id];
  let data = [
    newReport.is_report_sended,
    newReport.week_id,
    newReport.worker_id,
    newReport.claimant_id,
    newReport.report_commit_date,
    newReport.report_edit_date,
  ];
  console.log("🚀 ~ file: report.model.js ~ line 93 ~ data", data)
  let checkSql = "select * from reports where worker_id = ? AND week_id = ?";
  let sql =
    "INSERT INTO `reports` (`is_report_sended`, `week_id`, `worker_id`, `claimant_id`, `report_commit_date`, `report_edit_date`) VALUES (?, ?, ?, ?, ?, ?)";

  con.query(checkSql, checkData, (err, rows, fields) => {
    if (rows.length > 0) {
      rspc.message =
        "Haftalık raporunuz sistemde mevcuttur. Haftalık rapor, haftada bir kere oluşturulabilir";
      rspc.resCode = 300;
      result(null, rspc);
    } else {
      con.query(sql, data, (err, row, fields) => {
        if (err) result(err, null);

        rspc.message =
        "Haftalık raporunuz eklenmiştir.";
        rspc.resCode = 200;
        rspc.data = row;
        result(null, rspc);
      });
    }
  });
};

Report.getByCode = function (code, result) {
  let rspc = { ...ResponseModel };

  let sql = `SELECT r.id,  r.is_report_sended, w.week_name, w.week_id, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id INNER JOIN
  report_row_entries rre ON rre.report_id = r.id
  where rre.code = ?;
  `;

  // let sql = `select * from reports r INNER JOIN report_row_entries rre ON rre.report_id = r.id where rre.code = ?;`;

  con.query(sql, code, (err, row, fields) => {
    if (row.length > 0) {
      rspc.message = "Aradığınız koda ait veri getirilmiştir.";
      rspc.resCode = 200;
      rspc.action = row;
      result(null, rspc);
    } else {
      rspc.message = "Aradığınız veri bulunamamaktadır.";
      rspc.resCode = 400;
      result(null, rspc);
    }
  });
};

Report.getByAction = function (action, result) {
  let rspc = { ...ResponseModel };

  let sql = `SELECT r.id, rre.actions , r.is_report_sended, w.week_name, w.week_id, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id INNER JOIN
  report_row_entries rre ON rre.report_id = r.id
  WHERE rre.actions LIKE '%${action}%'
  `;

  // let sql = `select * from reports r INNER JOIN report_row_entries rre ON rre.report_id = r.id where rre.code = ?;`;

  con.query(sql, (err, row, fields) => {
    if (row.length > 0) {
      rspc.message = "Aradığınız koda ait veri getirilmiştir.";
      rspc.resCode = 200;
      rspc.action = row;
      result(null, rspc);
    } else {
      rspc.message = "Aradığınız veri bulunamamaktadır.";
      rspc.resCode = 400;
      result(null, rspc);
    }
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
    if (err) result(err, null);

    result(null, row.affectedRows);
  });
};

Report.delete = function (id, result) {
  let sql = "DELETE FROM reports WHERE report_id = ?";

  con.query(sql, id, (err, row, fields) => {
    if (err) result(err, null);

    result(null, row.affectedRows);
  });
};

module.exports = Report;
