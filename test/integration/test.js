'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var status = require('http-status');
var request = require('supertest');
var helper = require('../test-helper');
var app = require('../../server');
var factory = require('factory-girl');
var Company = require('../../models/company');
var expect = chai.expect;

chai.use(chaiHttp);
helper.factories.findDefinitions();

describe('Routing', function () {

  afterEach(function (done) {
    helper.databaseCleaner.clean(done);
  });

  describe('Companies', () => {
    it('should list ALL companies on /companies GET', function (done) {
      factory.createMany('company', 10, function (err, companies) {
        request(app)
          .get('/api/v1/companies')
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.status(status.OK);
            expect(res.body.length).to.equal(10);
            for (let i = 0; i < companies.length; i++) {
              expect(res.body[i]._id).to.equal(companies[i]._id.toString());
              expect(res.body[i].name).to.equal(companies[i].name);
            }

            done();
          });
      });
    });

    it('should list a SINGLE company on /companies/:id GET', function (done) {
      factory.create('company', function (err, company) {
        request(app)
        .get('/api/v1/companies/' + company._id)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(status.OK);
          expect(res.body.name).to.equal(company.name);
          expect(res.body._id).to.equal(company._id.toString());
          done();
        });
      });
    });

    it('should add a SINGLE company on /companies POST', function (done) {
      var company = { name: 'Ourikas' };
      request(app)
        .post('/api/v1/companies')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(company)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(status.CREATED);
          expect(res.body.message).to.equal('Company added!');
          expect(res.body.data.name).to.equal(company.name);
          expect(res.body.data).to.have.property('_id');
          done();
        });
    });

    it('should update a SINGLE company on /companies/:id PUT', function (done) {
      let updatedName = 'Updated Name';
      factory.create('company', function (err, company) {
        expect(company.name).to.not.equal(updatedName);
        request(app)
        .put('/api/v1/companies/' + company._id)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ name: updatedName })
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(status.OK);
          Company.findById(company._id, function (err, data) {
            expect(err).to.not.exist;
            expect(data.name).to.be.equal(updatedName);
            done();
          });
        });
      });
    });

    it('should delete a SINGLE company on /companies/:id DELETE', function (done) {
      factory.create('company', function (err, company) {
        request(app)
        .delete('/api/v1/companies/' + company._id)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(status.OK);
          expect(res.body.message).to.equal('Company removed!');

          Company.findById(company._id, function (err, data) {
            expect(err).to.not.exist;
            expect(data).to.not.exist;
            done();
          });
        });
      });
    });
  });
});
