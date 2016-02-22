var companies = require('../controllers/company');
var router = require('express').Router();

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

router.route('/companies')
  .post(companies.createCompanies)
  .get(companies.getCompanies);

router.route('/companies/:id')
  .get(companies.getCompany)
  .put(companies.updateCompany)
  .delete(companies.deleteCompany);

module.exports = router;
