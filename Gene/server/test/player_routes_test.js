const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:3005/';
const server = require(__dirname + '/../server');

const player = require(__dirname + '/../models/player');
const serverUrl = 'localhost:3000';

describe('The player api', () => {
  before(() => {
    server.listen(3000);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
    server.close();
    done();
    });
  });
  it('should be able to get all players', (done) => {
    request(serverUrl)
      .get('/api/players')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should be able to create a new player with a valid age', (done) => {
    request(serverUrl)
      .post('/api/players/')
      .send({name: 'Bronko Nagurski', age: 25, position: 'Running Back', height: 72, weight: 220})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Bronko Nagurski');
        expect(res.body.age).to.eql(25);
        expect(res.body.position).to.eql('Running Back');
        expect(res.body.height).to.eql(72);
        expect(res.body.weight).to.eql(220);
        expect(res.body).to.have.property('_id');
        done();
      });
  });
  it('should err for a player with an invalid age', (done) => {
    request(serverUrl)
      .post('/api/players/')
      .send({name: 'Bronko Nagurski', age: 111, position: 'Running Back', height: 72, weight: 220})
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

  describe('requests that require a populated DB', () => {
    beforeEach((done) => {
      player.create({name: 'test player'}, (err, data) => {
        this.testplayer = data;
        done();
      });
    });
    it('should be able to change a player', (done) => {
      request(serverUrl)
        .put('/api/players/' + this.testplayer._id)
        .send({name: 'Richard Simmons', age: 33})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('Richard Simmons');
          expect(res.body.age).to.eql(33);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
    it('should be able to delete a player', (done) => {
      request(serverUrl)
        .delete('/api/players/' + this.testplayer._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
