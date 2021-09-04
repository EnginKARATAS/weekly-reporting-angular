const express = require("express");

const rowRouter = express.Router();

const rowController = require("../controller/row.controller");

rowRouter.get("/:id", rowController.findByReport);

rowRouter.delete("/:row_id", rowController.delete);

// Create a new item
rowRouter.post("/", rowController.create);

// // Retrieve a single item with id
// reportWorkerRouter.get('/:worker_id', rowController.findByWorkerId);

// Retrieve all items
rowRouter.get("/", rowController.findAll);

// Update an item
rowRouter.put("/", rowController.update);

// Delete an item with id
rowRouter.delete("/:id", rowController.delete);

module.exports = rowRouter;
