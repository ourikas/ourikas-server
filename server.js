'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var companiesController = require('./controllers/company');
var config = require('./config/config');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

mongoose.connect(config.db.mongodb);

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/v1', router);
app.listen(port);

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

router.route('/companies')
  .post(companiesController.createCompanies)
  .get(companiesController.getCompanies);

router.route('/companies/:id')
  .get(companiesController.getCompany)
  .put(companiesController.updateCompany)
  .delete(companiesController.deleteCompany);

console.log(`ourikas server is running on port ${port} in ${process.env.NODE_ENV} mode`);

module.exports = app;
