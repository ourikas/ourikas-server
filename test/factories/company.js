var faker = require('faker');
var factory = require('factory-girl');
var Company = require('../../models/company');

factory.define('company', Company, {
  name: faker.company.companyName()
});
