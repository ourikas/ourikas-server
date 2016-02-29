var users = require('../controllers/user');
var auth = require('../controllers/authenticate');
var router = require('express').Router();
var ensureAuthenticated = auth.ensureAuthenticated;

router.post('/authenticate', auth.authenticate);

router.route('/users')
  .post(users.create)
  .get(ensureAuthenticated, users.list);

router.route('/users/:id')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

module.exports = router;
