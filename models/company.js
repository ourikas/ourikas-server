var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Company', CompanySchema);
