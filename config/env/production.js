var secret = require('../secrets/secret');

module.exports = {
  db: {
    mongodb: 'mongodb://localhost:27017/ourikas-prod',
  },
  secret: secret,
};
