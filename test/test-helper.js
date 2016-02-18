var mongoose = require('mongoose'),
    requireDir = require('require-dir'),
    DatabaseCleaner = require('database-cleaner'),
    databaseCleaner = new DatabaseCleaner('mongodb');

exports.databaseCleaner = {
  clean: function (callback) {
    databaseCleaner.clean(mongoose.connections[0].db, function() {
      callback();
    });
  }
}

exports.factories = {
  findDefinitions: function () {
    requireDir('./factories');
  }
}
