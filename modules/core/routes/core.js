var router = require('express').Router();

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to ourikas server API :)' });
});

module.exports = router;
