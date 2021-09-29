'use strict';

const mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	port:3306,
	user: 'root',
	password: '',
	database: 'weekly'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

module.exports = con;