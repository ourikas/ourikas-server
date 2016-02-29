'use strict';

var requireDir = require('require-dir');
var _ = require('lodash');
var router = require('express').Router();

var routes = _.values(requireDir('../../routes'));

routes.forEach(function (route) {
  router.use('/', route);
});

module.exports = router;
