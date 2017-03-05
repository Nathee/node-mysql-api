
/* ======================================================================
 * Import Node Package
 * ====================================================================== */

var express     = require('express');
var router      = express.Router();

/* ======================================================================
 * Contect Database
 * ====================================================================== */

var connection = require('./../../services/connection');

/* ======================================================================
 * Model
 * ====================================================================== */

// GET: http://localhost:7000/v1.0/users
router.get ('', function (req, res) {

    var sqlCommand = '';
    sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
    sqlCommand += 'FROM `tbl_user` ';
    sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
    sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';
    sqlCommand += 'LIMIT 10';

    connection.query(sqlCommand, function(err, users, fields) {
        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
        if (users[0]) { 
            res.json ({ status: 200, success: true, message: 'OK', items: users }); 
        } else { 
            res.json ({ status: 400, message: 'BAD REQUEST' }); 
        }
    });

});

module.exports = router;