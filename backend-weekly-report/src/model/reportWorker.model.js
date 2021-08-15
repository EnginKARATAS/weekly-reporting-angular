"use strict";

var con = require("./../../config/db");

// ReportWorker Object

var ReportWorker = function (report) {
  this.id = report.id; //report id
  this.code = report.code;
  this.matter = report.matter;
  this.report_edit_date = report.report_edit_date;
  this.report_finish_date = report.report_finish_date;
  this.actions = report.actions;
  this.claimant = report.claimant_name + report.claimant_surname;
  this.scheduled_completion_date = report.scheduled_completion_date;
  this.is_timeout = report.is_timeout;
  this.weekly_time_spent = report.weekly_time_spent;
  this.status = report.status;
  this.comments = report.comments;
};

//Define CRUD Operations Functions
ReportWorker.findByWorkerId = function (id, result) {
  let sql =
  "SELECT * FROM reports r "+
  "INNER JOIN workers w ON r.worker_id = r.id "+
  "INNER JOIN report_row_entries s ON r.report_row_entry_id = s.id "+
  "INNER JOIN claimants c ON r.claimant_id = c.id "+
  "WHERE w.id = 44"
  
  con.query(sql, id, (err, row, fields) => {
    console.log("error", err);
    if (err) result(err, null);
    ReportWorker(row)



    result(null, row);
  });
};

ReportWorker.findByWorkerId = function (id, result) {
  let sql =
  "SELECT * FROM reports r "+
  "INNER JOIN workers w ON r.worker_id = r.id "+
  "INNER JOIN report_row_entries s ON r.report_row_entry_id = s.id "+
  "INNER JOIN claimants c ON r.claimant_id = c.id "+
  "WHERE w.id = 2"
  
  

  con.query(sql, id, (err, row, fields) => {
    console.log("error: ", err);
    if (err) result(err, null);

    console.log(row);
    result(null, row);
  });
};
 

module.exports = ReportWorker;
