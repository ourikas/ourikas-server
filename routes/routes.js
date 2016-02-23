var companies = require('../controllers/company');
var auth = require('../controllers/authenticate');
var router = require('express').Router();
var ensureAuthenticated = auth.ensureAuthenticated;

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

router.post('/authenticate', auth.authenticate);

router.route('/companies')
  .post(companies.create)
  .get(ensureAuthenticated, companies.list);

router.route('/companies/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

module.exports = router;
