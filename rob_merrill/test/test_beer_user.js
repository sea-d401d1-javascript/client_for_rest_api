'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');
const request = chai.request;

describe('the user POST to a beer api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

it('should check the data from beer created by user POST', done => {
  request('localhost:3000')
    .post('/api/beers')
    // .set('token, this.token')
    .send({ name: 'testerBeer' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.eql('testerBeer');
      done();
    });
});

it('should check the data from beer created by user GET', done => {
    request('localhost:3000')
      .get('/api/beers')
      // .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(1);
        done();
    });
  });

  it('should have a successful login', done => {
    request('localhost:3000')
      .get('/api/signin')
      .auth('testUser', 'password')
      .end((err, res) => {
        expect(err).to.eql(null);
        // expect(res.body).to.have.property('token');
        done();
      });
  });
});
