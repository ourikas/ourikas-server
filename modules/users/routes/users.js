var path = require('path');
var users = require('../controllers/user');
var auth = require(path.resolve('modules/authenticate/controllers/authenticate'));
var ensureAuthenticated = auth.ensureAuthenticated;
var router = require('express').Router();

router.post('/authenticate', auth.authenticate);

router.route('/users')
  .post(users.create)
  .get(ensureAuthenticated, users.list);

router.route('/users/:id')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

module.exports = router;
