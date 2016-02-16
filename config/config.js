const _ = require('lodash');
const ENVIROMENTS = ['test', 'production', 'development'];
const ENV = process.env.NODE_ENV || 'development';
var config = {};

if(_.includes(ENVIROMENTS, ENV)) {
  config = require(`./env/${ENV}`);
}

module.exports = config;
