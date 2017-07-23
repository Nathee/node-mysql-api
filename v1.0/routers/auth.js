
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

var AuthModel = require('./../../model/auth');
var UserModel = require('./../../model/user');

/* ======================================================================
 * Router
 * ====================================================================== */

// POST: http://127.0.0.1:7000/v1.0/auth/token
router.post ('/token', function (req, res) {

    UserModel.findOneByEmail(req.body.email, function(responseUser) {

        AuthModel.findOneByEmail(req.body.email, function (responseAuth) {

            var token = jwt.sign(responseUser, service.secret, { expiresIn: service.expires, algorithm: 'HS256' });
            res.json({ status: 200, success: true, message: 'OK', token: token });
            return true;

        }, function (err) {
            
            AuthModel.save([ req.body.email, 0 ], function (responseAuth) {

                var token = jwt.sign(responseUser, service.secret, { expiresIn: service.expires, algorithm: 'HS256' });
                res.json({ status: 201, created: true, message: 'CREATED', token: token });
                return true;

            }, function (err) {

                res.json({ status: 400, message: 'BAD REQUEST' });
                return true;

            });

        });

    }, function (err) { 

        res.json({ status: 400, message: 'BAD REQUEST' });
        return true;

    });

});

// GET: http://127.0.0.1:7000/v1.0/auth/tokens
router.get ('/tokens', function (req, res) {
    
    AuthModel.findAll(function (responseAuth) {

        res.json({ status: 200, success: true, message: 'OK', items: responseAuth });
        return true;

    }, function (err) {

        res.json({ status: 400, message: 'BAD REQUEST' });
        return true;

    });

});

// GET: http://127.0.0.1:7000/v1.0/auth/tokens/:limit
router.get ('/tokens/:limit', function (req, res) {

    Auth.findAllByLimit(req.params.limit, function(responseAuth) {

        res.json({ status: 200, success: true, message: 'OK', items: responseAuth });
        return true;

    }, function (err) {

        res.json({ status: 400, message: 'BAD REQUEST' });
        return true;

    });

});

module.exports = router;