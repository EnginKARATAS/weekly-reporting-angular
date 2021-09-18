"use strict";

const con = require("../../config/db");
const Row = require("../model/row.model");

exports.findByReport = function (req, res) {
  const id = req.params.id;
  
  console.log("🚀 ~ file: checkAuth.js ~ line 🧨🧨🧨 ~ req.userData", req.userData)
 
  if (!id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Row.findByReport(id, function (err, rows) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching rows for id " + id);
    console.log("rows: ", rows);

    if (rows.length <= 0) {
      return res.send(null);
    }
    return res.send(rows);
    
  });
};

exports.clientFindByReport = function (req, res) {
  const id = req.body.report_id;
  const worker_id = req.body.worker_id;
  
 
  if (!id || !worker_id) {
    // 400 = bad request
    return res.status(400).send("The required path variable id is missing");
  }

  Row.clientFindByReport({id, worker_id}, function (err, rows) {
    if (err)
      return res
        .status(500)
        .send("Error occured during fetching rows for id " + id);
    console.log("rows: ", rows);

    return res.json(rows);
  });
};

exports.findByWorkerId = function (req, res) {
  const worker_id = req.params.worker_id;

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

      return res.send(newRow);
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
  const row_id = req.params.row_id;

  if (!row_id) {
    // 400 = bad request
    return res.status(400).send("The required path variable row_id is missing");
  }

  Row.delete(row_id, function (err, code) {
    if (err)
      return res.json({message: "Aksiyon silinirken hata oluştu", resCode: 400});

    return res.json({message: `${code} Kodlu Aksiyon Silindi`, resCode: 200});
  });
};
