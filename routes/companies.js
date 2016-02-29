var companies = require('../controllers/company');
var ensureAuthenticated = require('../controllers/authenticate').ensureAuthenticated;
var router = require('express').Router();

router.route('/companies')
  .post(companies.create)
  .get(ensureAuthenticated, companies.list);

router.route('/companies/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

module.exports = router;
