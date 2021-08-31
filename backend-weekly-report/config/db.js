'use strict';

const mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '192837465engin',
	database: 'weekly'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

// module.exports = co user ıd ve is logged inn;