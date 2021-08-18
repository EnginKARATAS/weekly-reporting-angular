"use strict";

const con = require("../../config/db");
const Auth = require("../model/auth.model");

 
exports.login = function (req, res) {
  // let username = req.body.username
  // let password = req.body.password
  
  // Auth.login({username,password, req}, function(err, item_id) {
  //   console.log('err: ', err);
  //   //if (err === Object) res.status(500).send('Item already exist with name ' + err.item_name);
    
  //   if (err || item_id <= 0) return res.status(500).send('Error occured during saving item');
    
  //   return res.sendStatus(200);
  // });
};

 