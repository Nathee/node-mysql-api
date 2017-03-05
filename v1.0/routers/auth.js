
/* ======================================================================
 * Import Node Package
 * ====================================================================== */

var express = require('express');
var jwt = require ('jsonwebtoken');
var router = express.Router();

/* ======================================================================
 * Contect Database
 * ====================================================================== */

var service = require('./../../setting/service');
var connection = require('./../../services/connection');

/* ======================================================================
 * Model
 * ====================================================================== */

// GET: http://127.0.0.1:7000/v1.0/auth/token
router.get ('/token', function (req, res) {
    res.json ({ status: 200, success: true, message: 'OK' });
});

// POST: http://127.0.0.1:7000/v1.0/auth/token
router.post ('/token', function (req, res) {
    connection.query('SELECT `tbl_user`.`email` FROM `tbl_user` WHERE `email` = ? LIMIT 1', [ req.body.email ], function(err, users, fields) {
        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
        if (users[0]) {
            connection.query('SELECT `tbl_auth`.* FROM `tbl_auth` WHERE `email` = ? LIMIT 1', [ req.body.email ], function(err, auths, fields) {
                if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
                if (auths[0]) {
                    var token = jwt.sign(users[0], service.secret, { expiresIn: service.expires, algorithm: 'HS256' });
                    res.json({ status: 200, success: true, message: 'OK', token: token });
                } else { 
                    connection.query('INSERT INTO `tbl_auth` (`email`, `admin`) VALUES (?, ?)', [ req.body.email, 0 ], function(err, rows, fields) {
                        if (err) { res.json({ status: 400, message: 'BAD REQUEST' }); }
                        var token = jwt.sign(users[0], service.secret, { expiresIn: service.expires, algorithm: 'HS256' });
                        res.json({ status: 201, created: true, message: 'CREATED', token: token }); 
                    });
                }
            });
        } else { 
            res.json({ status: 400, message: 'BAD REQUEST' }); 
        }
    });
});

module.exports = router;