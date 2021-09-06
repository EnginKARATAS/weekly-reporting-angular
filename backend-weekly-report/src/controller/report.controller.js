"use strict";

const con = require("../../config/db");
const Report = require("../model/report.model");

exports.findById = function (req, res) {
  const id = req.params.id;
  console.log(id);
  console.log("id");
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

exports.findByWorkerId = function (req, res) {
  const id = req.params.id;
  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }
  Report.findByWorkerId(id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + id);
    console.log("report: ", report);

    return res.send(report);
  });
};

exports.findAll = function (req, res) {
  Report.findAll(function (err, reports) {
    if (req.session.page_views) {
      req.session.page_views++;
    } else {
      req.session.page_views = 1;
    }
    if (err)
      return res.status(500).send("Error occured during fetching reports");
    // console.log("reports: ", reports);

    return res.send(reports);
  });
};

let getSystemWeekOfYear = function () {
  let currentdate = new Date();
  let cc = new Date().getFullYear();
  var oneJan = new Date(cc, 0, 1);
  let d = currentdate.getTime() - oneJan.getTime();
  var numberOfDays = Math.floor(d / (24 * 60 * 60 * 1000));
  var week_of_year = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  return week_of_year;
};
let ResponseModel = function () {
  (this.message = ""), (this.resCode = 0);
};
exports.create = function (req, res) {
  const newReport = new Report(req.body);
  let rpmc = { ...ResponseModel };
  if (newReport.week_id != getSystemWeekOfYear()) {
    rpmc.message =
      "Tarayıcınız ile sistemimizin tarih aralıkları aynı değildir. Lütfen tekrar deneyiniz.";
    rpmc.resCode = 401;
    res.json(rpmc);
  }
  // 400 = bad request
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    rpmc.message = "Kabul edilmeyen bir istekte bulunuldu"
    rpmc.resCode = 402;
    return res.json(rpmc)
  }
  if (!newReport.week_id || !newReport.worker_id) {
    rpmc.message = "Sistem yeni rapor eklerken hata verdi"
    rpmc.resCode = 400;
    return res.json(rpmc)
  } else {
    Report.create(newReport, function (err, row) {
      if (err) return res.status(500).send("Error occured during saving item");
      
      console.log("🚀 ~ file: report.controller.js ~ line 91 ~ row", row)
      return res.json(row);
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
