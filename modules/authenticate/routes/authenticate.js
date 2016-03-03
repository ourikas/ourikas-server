var auth = require('../controllers/authenticate');
var router = require('express').Router();
var ensureAuthenticated = auth.ensureAuthenticated;

router.post('/authenticate', auth.authenticate);

module.exports = router;
