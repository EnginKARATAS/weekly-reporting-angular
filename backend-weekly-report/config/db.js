'use strict';

const mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_week'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

module.exports = con;