'use strict';

var mongoose = require('mongoose');
var requireDir = require('require-dir');
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');
var factory = require('factory-girl');
var request = require('supertest');
var app = require('../server');

exports.databaseCleaner = {
  clean: function (callback) {
    databaseCleaner.clean(mongoose.connections[0].db, callback);
  },
};

exports.factories = {
  findDefinitions: function () {
    requireDir('./factories');
  },
};

exports.authenticate = function (callback) {
  factory.create('user', function (err, user) {
    if (err)
      return callback(err);

    request(app)
    .post('/v1/authenticate')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      username: user.username,
      password: user.username,
    })
    .expect(200)
    .end(function (err, res) {
      if (err)
        return callback(err);

      let auth = {
        user: user,
        token: res.body.token,
      };

      return callback(null, auth);
    });
  });
};
