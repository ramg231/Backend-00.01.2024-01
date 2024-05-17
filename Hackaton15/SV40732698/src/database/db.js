var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Omar.75767778",
    database: "mensajes"
});
con.connect(function (err) {
    if (err) throw err;
	var sql = "CREATE TABLE IF NOT EXISTS  message (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, message VARCHAR(2550) , user VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "CREATE TABLE IF NOT EXISTS  login (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(250) unique , password VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "CREATE TABLE IF NOT EXISTS order_amazon (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(250) , order_user VARCHAR(250), origin VARCHAR(250), destiny VARCHAR(250), kilo VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "CREATE TABLE IF NOT EXISTS order_amazon_tracking (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, origin VARCHAR(250), destiny VARCHAR(250))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

module.exports = con;