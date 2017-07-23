
/* ======================================================================
 * Import Node Package
 * ====================================================================== */

var jwt = require ('jsonwebtoken');

/* ======================================================================
 * Contect Database
 * ====================================================================== */

var service = require('./../setting/service');
var connection = require('./../services/connection');

/* ======================================================================
 * Exports
 * ====================================================================== */

module.exports =  {

    findOneByID: function (id, callback, errCallback) {

        var sqlCommand = '';
        sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
        sqlCommand += 'FROM `tbl_user` ';
        sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
        sqlCommand += 'WHERE `tbl_user`.`user_id` = ? ';
        sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';
        sqlCommand += 'LIMIT 1';

        connection.query(sqlCommand, [ id ], function (err, users, fields) {
            if (err) { return errCallback(); }
            if (typeof users !== 'undefined' && users[0]) {
                return callback(users[0]);
            } else {
                return errCallback();
            }
        });

    },
    
    findOneByEmail: function (email, callback, errCallback) {

        var sqlCommand = '';
        sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
        sqlCommand += 'FROM `tbl_user` ';
        sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
        sqlCommand += 'WHERE `tbl_user`.`email` = ? ';
        sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';
        sqlCommand += 'LIMIT 1';

        connection.query(sqlCommand, [ email ], function (err, users, fields) {
            if (err) { return errCallback(); }
            if (typeof users !== 'undefined' && users[0]) {
                return callback(users[0]);
            } else {
                return errCallback();
            }
        });

    },

    findAll: function (callback, errCallback) {

        var sqlCommand = '';
        sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
        sqlCommand += 'FROM `tbl_user` ';
        sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
        sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';

        connection.query(sqlCommand, function (err, users, fields) {
            if (err) { return errCallback(); }
            if (typeof users !== 'undefined' && users[0]) {
                return callback(users);
            } else {
                return errCallback();
            }
        });

    },

    findAllByEmail: function (email, callback, errCallback) {

        var sqlCommand = '';
        sqlCommand += 'SELECT `tbl_user`.*, `tbl_profile`.* ';
        sqlCommand += 'FROM `tbl_user` ';
        sqlCommand += 'INNER JOIN `tbl_profile` ON (`tbl_user`.`user_id` = `tbl_profile`.`user_id`) ';
        sqlCommand += 'WHERE `tbl_user`.`email` = ? ';
        sqlCommand += 'GROUP BY `tbl_user`.`user_id` ';

        connection.query(sqlCommand, [ email ], function (err, users, fields) {
            if (err) { return errCallback(); }
            if (typeof users !== 'undefined' && users[0]) {
                return callback(users);
            } else {
                return errCallback();
            }
        });
        
    }
    
};