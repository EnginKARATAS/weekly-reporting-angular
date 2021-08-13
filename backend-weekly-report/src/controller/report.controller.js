"use strict";

const Report = require("../model/report.model");

exports.findById = function (req, res) {
  const id = req.params.id;

  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Report.findById(id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + id);
    console.log("report: ", report);

    return res.send(report);
  });
};

exports.findByName = function (req, res) {
  const name = req.body.name;

  // 400 = bad request
  if (!name) {
    return res.status(400).send("The required field name is missing");
  }

  Report.findByName(name, function (err, reports) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for name " + name);

    console.log("reports: ", reports);

    return res.send(reports);
  });
};

exports.findAll = function (req, res) {
  Report.findAll(function (err, reports) {
    if (err)
      return res.status(500).send("Error occured during fetching reports");
    console.log("reports: ", reports);

    return res.send(reports);
  });
};

exports.create = function (req, res) {
  const newItem = new Report(req.body);
  console.log(newItem);
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
    Report.create(newItem, function (err, report_id) {
      console.log("err: ", err);
      //if (err === Object) res.status(500).send('Report already exist with name ' + err.item_name);

      if (err || report_id <= 0)
        return res.status(500).send("Error occured during saving report");

      return res.sendStatus(200);
    });
  }
};

exports.update = function (req, res) {
  const report = new Report(req.body);

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
    Report.update(report, function (err, result) {
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

  Report.delete(id, function (err, employee) {
    if (err)
      return res.status(500).send("Error occured during deleting report");

    return res.sendStatus(200);
  });
};
