const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:3005/';
const server = require(__dirname + '/../server');

const Team = require(__dirname + '/../models/team');
const serverUrl = 'localhost:3000';

describe('The team api', () => {
  before(() => {
    server.listen(3000);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
    server.close();
    done();
    });
  });
  it('should be able to get all teams', (done) => {
    request(serverUrl)
      .get('/api/teams')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should be able to create a new team', (done) => {
    request(serverUrl)
      .post('/api/teams/')
      .send({name: 'Bashers', city: 'Concussionville', mascot: 'Dinged Helmet', age: 99})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Bashers');
        expect(res.body.city).to.eql('Concussionville');
        expect(res.body.mascot).to.eql('Dinged Helmet');
        expect(res.body.age).to.eql(99);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('requests that require a populated DB', () => {
    beforeEach((done) => {
      Team.create({name: 'test team'}, (err, data) => {
        this.testTeam = data;
        done();
      });
    });
    it('should be able to change a team', (done) => {
      request(serverUrl)
        .put('/api/teams/' + this.testTeam._id)
        .send({name: 'Cavemen', city: 'Newark', age: 1})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('Cavemen');
          expect(res.body.city).to.eql('Newark');
          expect(res.body.age).to.eql(1);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
    it('should be able to delete a team', (done) => {
      request(serverUrl)
        .delete('/api/teams/' + this.testTeam._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
