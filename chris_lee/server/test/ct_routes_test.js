const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const server = require(__dirname + '/../server');
const CT = require(__dirname + '/../models/ct_model');
process.env.MONGOLAB_URI = 'mongodb://localhost/app_dev';

describe('the counter strike api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to retrieve all counter-terrorists', (done) => {
    chai.request('localhost:3000')
      .get('/api/ct')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should create a counter-terrorist with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/ct')
      .send({name: 'test ct'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test ct');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('makes REST requests that require a ct already in db', () => {
    beforeEach((done) => {
      CT.create({name: 'test ct'}, (err, data) => {
        this.testCT = data;
        done();
      });
    });
    it('should be able to update a counter-terrorist', (done) => {
      chai.request('localhost:3000')
        .put('/api/ct/' + this.testCT._id)
        .send({name: 'new bear name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated CT');
          done();
        });
    });
    it('should be able to delete a counter-terrorist', (done) => {
      chai.request('localhost:3000')
        .delete('/api/ct/' + this.testCT._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully deleted CT');
          done();
        });
    });
  });
});
