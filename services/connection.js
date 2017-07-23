
/* ======================================================================
 * Import Node Package
 * ====================================================================== */

var mysql = require('mysql');

/* ======================================================================
 * Contect Database
 * ====================================================================== */

var service = require('./../setting/service');
var connection = mysql.createConnection({ host : service.db_host, port : service.db_port, user : service.db_user, password : service.db_pass, database : service.db_name });

connection.connect(function(err) {
    if (!err) {
        console.log('Database is connected ...');    
    } else {
        console.log('Error connecting database ...');    
    }
});

/* ======================================================================
 * Exports
 * ====================================================================== */

module.exports = connection;