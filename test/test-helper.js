var mongoose = require('mongoose'),
    requireDir = require('require-dir');

exports.databaseCleaner = {
  clean: function (callback) {
    mongoose.connection.db.dropDatabase(function (err) {
      callback();
    });
  }
}

exports.factories = {
  findDefinitions: function () {
    requireDir('./factories');
  }
}
