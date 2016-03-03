'use strict';

var glob = require('glob');
var path = require('path');
var config = require('../config');
var _ = require('lodash');
var router = require('express').Router();

var routesPaths = glob.sync(config.assets.routes);

routesPaths.forEach(function (route) {
  let routePath = path.resolve(route);
  router.use('/', require(routePath));
});

module.exports = router;
