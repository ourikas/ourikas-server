var path = require('path');
var companies = require('../controllers/company');
var auth = require(path.resolve('modules/authenticate/controllers/authenticate'));
var ensureAuthenticated = auth.ensureAuthenticated;
var router = require('express').Router();

router.route('/companies')
  .post(companies.create)
  .get(ensureAuthenticated, companies.list);

router.route('/companies/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

module.exports = router;
