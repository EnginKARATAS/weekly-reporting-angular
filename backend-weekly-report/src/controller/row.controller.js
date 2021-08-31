"use strict";

const con = require("../../config/db");
const Row = require("../model/row.model");

exports.findByReport = function (req, res) {
  const id = req.params.id;
 
  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Row.findByReport(id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + id);
    console.log("report: ", report);

    if (report.length <= 0) {
      return res.send(null);
    }
    return res.send(report);

    
  });
};

exports.findByWorkerId = function (req, res) {
  const worker_id = req.params.worker_id;
  console.log("🚀 ~ file: report.controller.js ~ line 29 ~ id", worker_id);

  if (!worker_id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Row.findByWorkerId(worker_id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + worker_id);
    console.log("report: ", report);

    return res.send(report);
  });
};

exports.findAll = function (req, res) {
  Row.findAll(function (err, reports) {
    if (err)
      return res.status(500).send("Error occured during fetching reports");
    console.log("reports: ", reports);

    return res.send(reports);
  });
};

exports.create = function (req, res) {
  const newRow = new Row(req.body);
  console.log("🚀 ~ file: row.controller.js ~ line 63 ~ req.body", req.body);
  console.log(newRow);
  // 400 = bad request

  if (!newRow.report_id) {
    return res.status(400).send("One or more required fields are missing");
  } else {
    Row.create(newRow, function (err, report_id) {
      console.log("err: ", err);
      //if (err === Object) res.status(500).send('Row already exist with name ' + err.item_name);

      if (err || report_id <= 0)
        return res.status(500).send("Error occured during saving report");

      return res.sendStatus(200);
    });
  }
};

exports.update = function (req, res) {
  const report = new Row(req.body);

  // 400 = bad request
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("One or more required fields are missing");
  }
  if (
    !report.code ||
    !report.worker_id ||
    !report.claimant_id ||
    !report.report_row_entry_id ||
    !report.report_commit_date ||
    !report.report_edit_date
  ) {
    return res.status(400).send("One or more required fields are missing");
  } else {
    Row.update(report, function (err, result) {
      if (err || result <= 0)
        return res.status(500).send("Error occured during updating report");

      return res.sendStatus(200);
    });
  }
};

exports.delete = function (req, res) {
  const id = req.params.id;

  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Row.delete(id, function (err, employee) {
    if (err)
      return res.status(500).send("Error occured during deleting report");

    return res.sendStatus(200);
  });
};
