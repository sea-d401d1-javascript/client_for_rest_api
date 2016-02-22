'use strict';

const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis');
  } catch (e) {
    console.log(e);
    return res.status(401).json({msg: 'you are not an authentic user: invalid json'});
  }
  User.findOne({ _id: decoded.id }, (err, user) => {
    if (err) return res.status(401).json({ msg: 'you are not an authentic user: invalid password'});
    if (!user) return res.status(401).json({ msg: 'you are not an authentic user'});
    req.user = user;
    next();
  });
};
