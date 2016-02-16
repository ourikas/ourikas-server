var mongoose = require('mongoose');
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');

module.exports = {
  clean: function () {
    databaseCleaner.clean(mongoose.connection.db, function() {
      console.log('Database cleaned');
    });
  }
}
