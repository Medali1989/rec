const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')
var Profil = require('../models/profilSchema');
var Company = require('../models/companySchema');
var User = require('../models/userSchema');


passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,'s3cr3t', function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        Profil.findOne({ _id: decoded.data._id }, function (err, profil) {
          if (err) { return done(err); }
          if (!profil) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));
passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,'s3cr3t', function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        Company.findOne({ _id: decoded.data._id }, function (err, company) {
          if (err) { return done(err); }
          if (!company) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));
passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,'s3cr3t', function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded.data._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));