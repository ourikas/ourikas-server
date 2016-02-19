const _ = require('lodash');
const ENVIROMENTS = ['test', 'production', 'development'];
var config = {};

if(_.includes(ENVIROMENTS, process.env.NODE_ENV)) {
  config = require(`./env/${process.env.NODE_ENV}`);
}

module.exports = config;
