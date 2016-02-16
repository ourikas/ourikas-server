'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    status = require('http-status'),
    request = require('supertest'),
    helper = require('../test-helper'),
    app = require('../../server'),
    factory = require('factory-girl'),
    expect = chai.expect;

chai.use(chaiHttp);
helper.factories.findDefinitions();

describe('Routing', function() {

  beforeEach(function (done) {
    helper.databaseCleaner.clean();
    done();
  });

  describe('Company', () => {
    it('should list ALL companies on /companies GET', function (done) {
      var company = factory.buildSync('company');

      request(app)
        .get('/api/v1/companies')
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(status.OK);
          console.log(res.body);
          done();
        });
    });

    it('should list a SINGLE company on /company/:id GET', function (done) {
      var company = {
        name: 'Ourikas'
      };

      request(app)
        .post('/api/v1/companies')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(company)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body.data.name).to.equal(company.name);
          done();
        });
    });

    it('should add a SINGLE company on /companies POST');

    it('should update a SINGLE company on /company/:id PUT');

    it('should delete a SINGLE company on /company/:id DELETE');
  });
});
