'use strict';

var request = require('supertest');

describe('Factories', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all factories', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                console.log(res.body);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/factories/1b83045b-3e73-420f-93b5-8cc56e138cd3')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.company_type).toEqual('factory');
                done(res);
            });
    });
    it('creates a new factory', function (done) {
        request(app)
            .post('/factories')
            .send({ name: 'Test Factory',
                    email: "test_factory@gmail.com",
                    phone_number: "(718)555-5555",
                    city: "New York",
                    state:"NY"})
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Factory');
                expect(res.body.email).toEqual('test_factory@gmail.com');
                expect(res.body.phone_number).toEqual('(718)555-5555');
                expect(res.body.city).toEqual('New York');
                expect(res.body.state).toEqual('NY');
                expect(res.body.company_type).toEqual('factory');
                done(res);
            });
    });
    it('removes a factory', function(done) {
      request(app)
          .delete('/factories/5ab408bf-988b-438f-8f9d-772f8d17e087')
          .expect(200)
          .end(function(err, res) {
            if (err) return done.fail(res);
            done(res);
          });
    });
});
