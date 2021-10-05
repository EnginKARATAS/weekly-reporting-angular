"use strict";

const con = require("../../config/db");
const Report = require("../model/report.model");


exports.getAllReports = function ( req, res ) {
  //gmnin kontrolü checkGmAuth`da yapıldı


  Report.getAllReports(function (err,reports){
    if (err) res.send(err)

    res.send(reports)
  })
}

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

    return res.send(report);
  });
};

exports.findByWorkerId = function (req, res) {
  const id = req.params.id;
  if (!id) {
    // 400 = bad request
    return res.status(400).send("id eksik gelmiştir.");
  }
  Report.findByWorkerId(id, function (err, report) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching report for id " + id);

    return res.send(report);
  });
};

exports.findAll = function (req, res) {
  Report.findAll(function (err, reports) {
    if (err)
      return res.status(500).send("bilgiler getirilirken hata oluştu");

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
 
exports.create = function (req, res) {
  const newReport = new Report(req.body);
  if (newReport.week_id != getSystemWeekOfYear()) {
    res.json({message:"Tarayıcınız ile sistemimizin tarih aralıkları aynı değildir. Lütfen tekrar deneyiniz.", resCode:401});
  }
 
  else {
    Report.create(newReport, function (err, row) {
      if (err) return res.json({message:err, resCode:402});

      return res.json(row);
    });
  }
};

exports.getByCode = function (req, res) {
  let code = req.body.code;
  if (code) {
    Report.getByCode(code, function (err, row) {
      if (err) return res.status(500).send("Error occured during saving item");

      return res.json(row);
    });
  }
};

exports.getByAction = function (req, res) {
  let action = req.body.action;
  if (action) {
    Report.getByAction(action, function (err, row) {
      if (err) return res.status(500).send("Error occured during saving item");

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
    return res.status(400).send("eksik bilgi gönderildi");
  } else {
    Report.update(report, function (err, result) {
      if (err || result <= 0)
        return res.status(500).send("rapor eklenirken hata oluştu");

      return res.sendStatus(result);
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
