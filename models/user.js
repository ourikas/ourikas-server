'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
  let _this = this;
  if (!_this.isModified('password'))
    return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(_this.password, salt, function (err, hash) {
      if (err) return next(err);
      _this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
