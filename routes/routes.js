var companies = require('../controllers/company');
var users = require('../controllers/user');
var auth = require('../controllers/authenticate');
var router = require('express').Router();
var ensureAuthenticated = auth.ensureAuthenticated;

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

router.post('/authenticate', auth.authenticate);

// Companies

router.route('/companies')
  .post(companies.create)
  .get(ensureAuthenticated, companies.list);

router.route('/companies/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

// Users

router.route('/users')
  .post(users.create)
  .get(ensureAuthenticated, users.list);

router.route('/users/:id')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

module.exports = router;
