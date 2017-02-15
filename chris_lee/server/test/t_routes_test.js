const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const server = require(__dirname + '/../server');
const T = require(__dirname + '/../models/t_model');
process.env.MONGOLAB_URI = 'mongodb://localhost/app_dev';

describe('the counter strike api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to retrieve all terrorists', (done) => {
    chai.request('localhost:3000')
      .get('/api/t')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should create a terrorist with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/t')
      .send({name: 'test t'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test t');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('makes REST requests that require a t already in db', () => {
    beforeEach((done) => {
      T.create({name: 'test t'}, (err, data) => {
        this.testT = data;
        done();
      });
    });
    it('should be able to update a terrorist', (done) => {
      chai.request('localhost:3000')
        .put('/api/t/' + this.testT._id)
        .send({name: 'new t name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated T');
          done();
        });
    });
    it('should be able to delete a terrorist', (done) => {
      chai.request('localhost:3000')
        .delete('/api/t/' + this.testT._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully deleted T');
          done();
        });
    });
  });
});
