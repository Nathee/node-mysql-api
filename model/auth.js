
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
        connection.query('SELECT `tbl_auth`.* FROM `tbl_auth` WHERE `tbl_auth`.`auth_id` = ? LIMIT 1', [ id ], function (err, auths, fields) {
            if (err) { return errCallback(); }
            if (typeof auths !== 'undefined' && auths[0]) {
                return callback(auths[0]);
            } else {
                return errCallback();
            }
        });
    },
    
    findOneByEmail: function (email, callback, errCallback) {
        connection.query('SELECT `tbl_auth`.* FROM `tbl_auth` WHERE `tbl_auth`.`email` = ? LIMIT 1', [ email ], function (err, auths, fields) {
            if (err) { return errCallback(); }
            if (typeof auths !== 'undefined' && auths[0]) {
                return callback(auths[0]);
            } else {
                return errCallback();
            }
        });
    },

    findAll: function (callback, errCallback) {
        connection.query('SELECT `tbl_auth`.* FROM `tbl_auth`', function (err, auths, fields) {
            if (err) { return errCallback(); }
            if (typeof auths !== 'undefined' && auths[0]) {
                return callback(auths);
            } else {
                return errCallback();
            }
        });
    },

    findAllByEmail: function (email, callback, errCallback) {
        connection.query('SELECT `tbl_auth`.* FROM `tbl_auth` WHERE `tbl_auth`.`email` = ?', [ email ], function (err, auths, fields) {
            if (err) { return errCallback(); }
            if (typeof auths !== 'undefined' && auths[0]) {
                return callback(auths);
            } else {
                return errCallback();
            }
        });
    },

    findAllByLimit: function (limit, callback, errCallback) {
        connection.query('SELECT `tbl_auth`.* FROM `tbl_auth` LIMIT ?', [ limit ], function (err, auths, fields) {
            if (err) { return errCallback(); }
            if (typeof auths !== 'undefined' && auths[0]) {
                return callback(auths);
            } else {
                return errCallback();
            }
        });
    },

    save: function (params, callback, errCallback) {
        connection.query('INSERT INTO `tbl_auth` (`email`, `admin`) VALUES (?, ?)', params, function (err, rows, fields) {
            if (err) { return errCallback(); }
            return callback(rows);
        });
    }
    
};