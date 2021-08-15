"use strict";

const con = require("../../config/db");
const ReportWorker = require("../model/reportWorker.model");

exports.findById = function (req, res) {
  const id = req.params.id;
  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  ReportWorker.findById(id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + id);
    console.log("report: ", report);

    return res.send(report);
  });
};

exports.findByWorkerId = function (req, res) {
 
  const worker_id = req.params.worker_id;
 
  if (!worker_id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  ReportWorker.findByWorkerId(worker_id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + worker_id);
    console.log("report: ", report);
    return res.send(report);
  });
};

exports.findAll = function (req, res) {
  ReportWorker.findAll(function (err, reports) {
    if (err)
      return res.status(500).send("Error occured during fetching reports");
    console.log("reports: ", reports);

    return res.send(reports);
  });
};

exports.create = function (req, res) {
  const newItem = new ReportWorker(req.body);
  // 400 = bad request

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send("One or more required fields are missing");
  }
  if (
    !newItem.code ||
    !newItem.worker_id ||
    !newItem.claimant_id ||
    !newItem.report_row_entry_id ||
    !newItem.report_commit_date ||
    !newItem.report_edit_date
  ) {
    return res.status(400).send("One or more required fields are missing");
  } else {
    ReportWorker.create(newItem, function (err, report_id) {
      console.log("err: ", err);
      //if (err === Object) res.status(500).send('ReportWorker already exist with name ' + err.item_name);

      if (err || report_id <= 0)
        return res.status(500).send("Error occured during saving report");

      return res.sendStatus(200);
    });
  }
};

exports.update = function (req, res) {
  const report = new ReportWorker(req.body);

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
    ReportWorker.update(report, function (err, result) {
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

  ReportWorker.delete(id, function (err, employee) {
    if (err)
      return res.status(500).send("Error occured during deleting report");

    return res.sendStatus(200);
  });
};
