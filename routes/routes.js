var companies = require('../controllers/company');
var router = require('express').Router();

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

router.route('/companies')
  .post(companies.create)
  .get(companies.list);

router.route('/companies/:id')
  .get(companies.read)
  .put(companies.update)
  .delete(companies.delete);

module.exports = router;
