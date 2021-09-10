const express = require('express')
const reportRouter = express.Router()

const controller =   require('../controller/report.controller');

// Retrieve a single item with id
reportRouter.get('/:id', controller.findByWorkerId);

// Retrieve all items
reportRouter.get('/', controller.findAll);

// Create a new item
reportRouter.post('/', controller.create);

reportRouter.post('/getByCode', controller.getByCode);
reportRouter.post('/getByAction', controller.getByAction);


// Update an item
reportRouter.put('/', controller.update);

// Delete an item with id
reportRouter.delete('/:id', controller.delete);

module.exports = reportRouter