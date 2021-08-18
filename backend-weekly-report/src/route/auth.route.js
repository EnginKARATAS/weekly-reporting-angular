const express = require('express')

const authRouter = express.Router()

const authController =   require('../controller/auth.controller');

// Create a new item
authRouter.post('/', authController.login);
 

module.exports = authRouter