
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

// GET: http://localhost:7000/v1.0/user
router.get ('', function (req, res) {

    var sqlCommand = '';
    sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
    sqlCommand += 'FROM `tbl_user` ';
    sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
    sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';
    sqlCommand += 'LIMIT 1';

    connection.query(sqlCommand, function(err, user, fields) {
        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
        if (user[0]) { 
            res.json ({ status: 200, success: true, message: 'OK', item: user[0] }); 
        } else { 
            res.json ({ status: 400, message: 'BAD REQUEST' }); 
        }
    });

});

module.exports = router;