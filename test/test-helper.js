var mongoose = require('mongoose'),
    DatabaseCleaner = require('database-cleaner'),
    databaseCleaner = new DatabaseCleaner('mongodb'),
    requireDir = require('require-dir');

exports.databaseCleaner = {
  clean: function () {
    databaseCleaner.clean(mongoose.connection.db, function() {
      console.log('Database cleaned');
    });
  }
}

exports.factories = {
  findDefinitions: function () {
    requireDir('./factories');
  }
}
