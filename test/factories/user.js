'use strict';

var faker = require('faker');
var factory = require('factory-girl');
var User = require('../../models/user');

let username = faker.internet.userName();

factory.define('user', User, {
  username: username,
  password: username,
});
