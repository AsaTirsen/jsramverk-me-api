/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'testsecret';

// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const db = require('../db/database');

chai.use(chaiHttp);
chai.should();

describe("Reports", () => {
    it("truncate tables", (done) => {
        db.run("DELETE FROM users", (err) => {
            chai.expect(err).to.be.null;
            db.run("DELETE FROM texts", (err) => {
                chai.expect(err).to.be.null;
                done();
            });
        });
    });
    it("should register a user", (done) => {
        chai
            .request(server)
            .post('/register')
            .set('content-type', 'application/json')
            .send({email: 'asti@gmail.com', password: '123456'})
            .end((err, res) => {
                res.status.should.equal(201);
                res.body.should.be.a('object');
                done();
            });
    });
    let token = null;

    it("should login a user", (done) => {
        chai
            .request(server)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'asti@gmail.com', password: '123456'})
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                token = res.body.data.token;
                done();
            });
    });
    it("should insert a report", (done) => {
        chai
            .request(server)
            .post('/reports')
            .set('content-type', 'application/json')
            .set('x-access-token', token)
            .send({title: 'report', text: 'En text om grejer', week: '1'})
            .end((err, res) => {
                console.log(err);
                console.log(res.body);
                done();
            });
    });
    it("should get a list of reports", (done) => {
        chai.request(server)
            .get(`/reports`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].title.should.equal('report');
                done();
            });
    });
    it("should get a single report", (done) => {
        chai.request(server)
            .get(`/reports/week/1`)
            .end((err, res) => {
                res.should.not.have.status(404);
                res.body.data[0].title.should.equal('report');
                done();
            });
    });
    it("should update a report", (done) => {
        chai.request(server)
            .put('/reports')
            .set('content-type', 'application/json')
            .send({title: 'edited report', longtext: 'edited text', week: '2', id: 1})
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });
    it("should get a single report", (done) => {
        chai.request(server)
            .get(`/reports/week/2`)
            .end((err, res) => {
                res.should.not.have.status(404);
                res.body.data[0].title.should.equal('edited report');
                done();
            });
    });
});
