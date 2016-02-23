  const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/beers_app_test';
const server = require(__dirname + '/../server');
const Beer = require(__dirname + '/../models/beer');

describe('the beers api', () => {
 after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
  });
}); // end after
it('should be able to retrieve all of our beers', (done) => {
  chai.request('localhost:3000')
    .get('/api/beers')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
}); // end get test
it('should create a beer with a POST', (done) => {
  chai.request('localhost:3000')
    .post('/api/beers')
    .send({name: 'test beer'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('test beer');
      expect(res.body).to.have.property('_id');
      done();
    });
}); // end post test

}); // end describe




