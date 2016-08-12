'use strict';

var request = require('supertest');

describe('Brands', function () {
    var app;
    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all brands', function (done) {
        request(app)
            .get('/brands')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single brand', function (done) {
        request(app)
            .get('/brands/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.company_type).toEqual('brand');
                done(res);
            });
    });
    it('creates a new brand', function (done) {
        request(app)
            .post('/brands')
            .send({ name: 'Test Brand',
                    email: "test_brand@gmail.com",
                    phone_number: "(718)555-5555",
                    city: "New York",
                    state:"NY"})
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Brand');
                expect(res.body.email).toEqual('test_brand@gmail.com');
                expect(res.body.phone_number).toEqual('(718)555-5555');
                expect(res.body.city).toEqual('New York');
                expect(res.body.state).toEqual('NY');
                expect(res.body.company_type).toEqual('brand');
                done(res);
            });
    })
});
