const express = require("express");
const reportRouter = express.Router();

const controller = require("../controller/report.controller");
const checkAuth = require("../middleware/checkAuth");
const checkGmAuth = require("../middleware/checkGmAuth");

// Retrieve a single item with id
reportRouter.get("/:id", checkAuth, controller.findByWorkerId);

// Retrieve all items
reportRouter.get("/", checkAuth, controller.findAll);

// Create a new item
reportRouter.post("/", checkAuth, controller.create);

reportRouter.post("/getAllReports", checkGmAuth, controller.getAllReports);

reportRouter.post("/getByCode", checkAuth, controller.getByCode);
reportRouter.post("/getByAction", checkAuth, controller.getByAction);

// Update an item
reportRouter.put("/", controller.update);

// Delete an item with id
reportRouter.delete("/:id", controller.delete);

module.exports = reportRouter;
