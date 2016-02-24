'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var status = require('http-status');
var request = require('supertest');
var helper = require('../test-helper');
var app = require('../../server');
var factory = require('factory-girl');
var User = require('../../models/user');
var _ = require('lodash');
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

  describe('Users', function () {
    let url = '/v1/users/';

    afterEach(function (done) {
      helper.databaseCleaner.clean(done);
    });

    describe('/users', function () {
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

        it('lists ALL users', function (done) {
          this.timeout(6000);

          factory.createMany('user', 10, function (err, users) {
            expect(err).to.not.exist;
            request(app)
              .get(url)
              .set('x-access-token', auth.token)
              .end(function (err, res) {
                expect(err).to.not.exist;
                expect(res).to.have.status(status.OK);
                expect(res.body.length).to.equal(10);
                for (let i = 0; i < users.length; i++) {
                  expect(res.body[i]._id).to.equal(users[i]._id.toString());
                  expect(res.body[i].username).to.equal(users[i].username);
                }

                done();
              });
          });
        });
      });

      context('POST', function () {
        it('adds a SINGLE user', function (done) {
          let user = factory.buildSync('user').toObject();

          request(app)
          .post(url)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(user)
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.status(status.CREATED);
            expect(res.body.message).to.equal('User added!');
            expect(res.body.data.name).to.equal(user.name);
            expect(res.body.data).to.have.property('_id');
            done();
          });
        });
      });
    });

    describe('/users/:id', function () {
      context('GET', function () {
        it('lists a SINGLE user', function (done) {
          factory.create('user', function (err, user) {
            request(app)
            .get(url + user._id)
            .end(function (err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.status(status.OK);
              expect(res.body.name).to.equal(user.name);
              expect(res.body._id).to.equal(user._id.toString());
              done();
            });
          });
        });
      });

      context('PUT', function () {
        it('updates a SINGLE user', function (done) {
          let updatedName = 'Updated Name';
          factory.create('user', function (err, user) {
            expect(user.name).to.not.equal(updatedName);
            request(app)
            .put(url + user._id)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ name: updatedName })
            .end(function (err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.status(status.OK);
              User.findById(user._id, function (err, data) {
                expect(err).to.not.exist;
                expect(data.name).to.be.equal(updatedName);
                done();
              });
            });
          });
        });
      });

      context('DELETE', function () {
        it('deletes a SINGLE user', function (done) {
          factory.create('user', function (err, user) {
            request(app)
            .delete(url + user._id)
            .end(function (err, res) {
              expect(err).to.not.exist;
              expect(res).to.have.status(status.OK);
              expect(res.body.message).to.equal('User removed!');

              User.findById(user._id, function (err, data) {
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
