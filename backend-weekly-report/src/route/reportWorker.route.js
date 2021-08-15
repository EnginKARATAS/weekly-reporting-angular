const express = require('express')

const reportWorkerRoute = express.Router()

const controller =   require('../controller/reportWorker.controller');

// Retrieve a single item with id
reportWorkerRoute.get('/:worker_id', controller.findByWorkerId);

 

module.exports = reportWorkerRoute