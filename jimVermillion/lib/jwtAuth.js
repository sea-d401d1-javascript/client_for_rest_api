'use strict';

const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  console.log(req.headers);
  console.log('token in jwt: ' + req.headers.token);

  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis'); // eslint-disable-line
  } catch (e) {
    console.log(e);

    return res.status(401).json({ msg: 'you are not authentic, dude. trouble with token' });
  }
  User.findOne( { _id: decoded.id }, (err, user) => {
    if (err) return res.status(401).json({ msg: 'you are not authentic, dude, bad DB' }); // eslint-disable-line
    if (!user) return res.status(401).json({ msg: 'you are not authentic, dude, no user in DB' }); // eslint-disable-line
    req.user = user;
    next();
  });
};
