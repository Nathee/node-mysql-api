
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
    // sqlCommand += 'LIMIT 200';

    connection.query(sqlCommand, function(err, users, fields) {
        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
        if (typeof users !== 'undefined' && users[0]) { 
            res.json ({ status: 200, success: true, message: 'OK', items: users }); 
        } else { 
            res.json ({ status: 400, message: 'BAD REQUEST' }); 
        }
    });

});

// GET: http://localhost:7000/v1.0/users/:user_id
router.get ('/:user_id', function (req, res) {

    var sqlCommand = '';
    sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
    sqlCommand += 'FROM `tbl_user` ';
    sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
    sqlCommand += 'WHRER `tbl_user`.`user_id` = ? ';
    sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';
    sqlCommand += 'LIMIT 1';

    connection.query(sqlCommand, [ req.params.user_id ], function(err, users, fields) {
        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
        if (typeof users !== 'undefined' && users[0]) { 
            res.json ({ status: 200, success: true, message: 'OK', items: users[0] }); 
        } else { 
            res.json ({ status: 400, message: 'BAD REQUEST' }); 
        }
    });

});

module.exports = router;