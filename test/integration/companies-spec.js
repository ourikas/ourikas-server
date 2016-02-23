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
  var auth;

  before(function (done) {
    helper.authenticate(function (err, res) {
      if (err)
        throw err;

      auth = res;
      done();
    });
  });

  describe('Companies', function () {
    let url = '/v1/companies/';

    afterEach(function (done) {
      helper.databaseCleaner.clean(done);
    });

    describe('/companies', function () {
      context('GET', function () {
        it('requires authorization', function (done) {
          request(app)
          .get(url)
          .expect(status.UNAUTHORIZED)
          .end(function (err, res) {
            if (err)
            return done(err);
            done();
          });
        });

        it('lists ALL companies', function (done) {
          factory.createMany('company', 10, function (err, companies) {
            request(app)
            .get(url)
            .set('x-access-token', auth.token)
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
      });

      context('POST', function () {
        it('adds a SINGLE company', function (done) {
          let company = { name: 'Ourikas' };

          request(app)
          .post(url)
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
      });
    });

    describe('/companies/:id', function () {
      context('GET', function () {
        it('lists a SINGLE company', function (done) {
          factory.create('company', function (err, company) {
            request(app)
            .get(url + company._id)
            .end(function (err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.status(status.OK);
              expect(res.body.name).to.equal(company.name);
              expect(res.body._id).to.equal(company._id.toString());
              done();
            });
          });
        });
      });

      context('PUT', function () {
        it('updates a SINGLE company', function (done) {
          let updatedName = 'Updated Name';
          factory.create('company', function (err, company) {
            expect(company.name).to.not.equal(updatedName);
            request(app)
            .put(url + company._id)
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
      });

      context('DELETE', function () {
        it('deletes a SINGLE company', function (done) {
          factory.create('company', function (err, company) {
            request(app)
            .delete(url + company._id)
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
  });
});
