'use strict';

const _ = require('lodash');
const ENVIROMENTS = ['test', 'production', 'development'];
var config = {};

if (_.includes(ENVIROMENTS, process.env.NODE_ENV)) {
  let envConfig = require(`./env/${process.env.NODE_ENV}`);
  let defaultConfig = require('./env/default');
  config = _.merge(defaultConfig, envConfig);
}

module.exports = config;
