const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/brewers_app_test';
const server = require(__dirname + '/../server');
const Brewer = require(__dirname + '/../models/brewer');

describe('the brewers api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
        });
});

it('should be able to retrieve all of our brewers', (done) => {
  chai.request('localhost:3000')
    .get('/api/brewers')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
});

it('should create a brewer with a POST', (done) => {
  chai.request('localhost:3000')
    .post('/api/brewers')
    .send({name: 'test brewer'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('test brewer');
      expect(res.body).to.have.property('_id');
      done()
     });
});
});
