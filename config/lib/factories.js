'use strict';

var glob = require('glob');
var path = require('path');
var config = require('../config');

var loadedDefinitions = false;

module.exports = {
  findDefinitions: function () {
    if (!loadedDefinitions) {
      var factoriesPaths = glob.sync(config.assets.factories);
      factoriesPaths.forEach(function (factory) {
        let factoryPath = path.resolve(factory);
        require(factoryPath);
      });

      loadedDefinitions = true;
    }
  },
};
