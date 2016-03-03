'use strict';

var path = require('path');
var User = require(path.resolve('modules/users/models/user'));
var status = require('http-status');
var config = require(path.resolve('config/config'));
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const TOKEN_EXPIRATION = '1d';

exports.authenticate = function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err)
      res.send(err);

    if (!user) {
      res.json({
        message: 'Authentication failed. User not found.',
      });
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if (err)
          res.send(err);

        if (isMatch) {
          let token = jwt.sign(user, config.secret, {
            expiresIn: TOKEN_EXPIRATION,
          });

          res.json({
            message: 'Enjoy your token!',
            token: token,
          });
        } else {
          res.json({
            message: 'Authentication failed. Wrong password.',
          });
        }
      });
    }
  });
};

exports.ensureAuthenticated = function (req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(status.UNAUTHORIZED)
                  .json({ message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(status.UNAUTHORIZED).send({
      message: 'No token provided.',
    });
  }
};
