const express = require('express');
const jsonParser = require('body-parser').json();
const Movie = require(__dirname + '/../models/movie');
const handleError = require(__dirname + '/../lib/handle_error');
const jwtAuth =  require(__dirname + '/../lib/jwt_auth');

var movieRouter = module.exports = exports = express.Router();

movieRouter.post('/movies', jwtAuth, jsonParser, (req,res) => {
  //add case sensitive handler
  var newMovie = new Movie(req.body);
  newMovie.userid = req.user._id;
  console.log(newMovie);
  newMovie.save((err,data) => {
    if(err) handleError(err,res);
    res.status(200).json(data);
  });
});

movieRouter.get('/movies',jwtAuth, (req,res) => {
  Movie.find({userid: req.user._id}, (err,data) => {
    if(err) return handleError(err,res);

    res.status(200).json(data);
  });
});

movieRouter.put('/movies/:id', jwtAuth, jsonParser, (req,res) => {
  var movieData = req.body;
  delete movieData._id;
  Movie.update({_id:req.params.id}, movieData, {runValidators:true},(err) => {
    if(err)  return handleError(err, res);

    res.status(200).json('success');
  });
});

movieRouter.delete('/movies/:id',jwtAuth, (req,res) => {
  Movie.remove({_id:req.params.id},(err) => {
    if(err) return handleError;
    res.status(200).json({msg:'success'});
  });
});
