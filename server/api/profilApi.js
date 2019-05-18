var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Profil = require('../models/profilSchema');
var Offres = require('../models/offreSchema');
var auth = require('../auth/auth-jwt').authenticate;
var jwt = require ('jsonwebtoken');
var passport = require('passport');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });
var upload = multer({
    storage: storage
  })


  router.post('/upload',  upload.single('file'), async (req, res, next) => {
    res.send(req.file)
   });




router.post('/UpdateProfil/:id',passport.authenticate('bearer', { session: false }), function (req, res){
    Profil.findByIdAndUpdate(ObjectId(req.params.id), {$set:req.body}, function(err, profil){
        if (err){
            res.send(err);
        }
        res.send(profil);
    })
});
router.get('/getProfil/:id', passport.authenticate('bearer', {session:false}), function(req, res){
    Profil.findById(ObjectId(req.params.id)).exec(function(err, profil){
        if (err){
            res.send(err);
        }
        if (profil){
            res.send(profil);
        }
        else{
            res.send('no profil found')
        }
    })
});

module.exports = router;