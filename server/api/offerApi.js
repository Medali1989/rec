var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Profil = require('../models/profilSchema');
var Company = require('../models/companySchema');
var Offre = require('../models/offreSchema');
var auth = require('../auth/auth-jwt').authenticate;
var jwt = require ('jsonwebtoken');
var passport = require('passport');


router.get('/GetOffreById/:id', async (req, res)=> {
    const rslt =await Offre.findById(ObjectId(req.params.id)).populate('owner');
    res.send(rslt);
});


router.post('/UpdateOffre/:id',passport.authenticate('bearer', { session: false }), function (req, res){
    Offre.findByIdAndUpdate(ObjectId(req.params.id),{$set:req.body}, function(err, offre){
        if (err){
            res.send(err);
        }
        res.send(offre);
    })
});

router.get('/GetAllOffr', function(req,res){
    Offre.find({status:'Active'}).populate('owner').exec(function (err, offres){
        if (err){
            res.send(err)
        }
        res.send(offres)
    })
});

router.post('/ApplyOffre/:idp/:ido',  function(req, res){
    Offre.findByIdAndUpdate(ObjectId(req.params.ido), {$push:{applied_profiles:ObjectId(req.params.idp)}}, function(err, offre){
        if (err){
            res.send(err);
        }
        res.send(offre);
    })
})




module.exports = router;