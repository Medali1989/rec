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



router.get('/getCompany/:id',passport.authenticate('bearer', {session:false}), function(req,res){
    Company.findById(ObjectId(req.params.id)).exec(function(err,company){
        if (err){
            res.send(err);
        }
        res.send(company);
    });
});

router.get('/getAllCompany',passport.authenticate('bearer', {session:false}), function(req,res){
    Company.find().exec(function(err, companys){
        if (err){
            res.send(err);
        }
        res.send(companys);
    });
});

router.post('/createOffer/:id',passport.authenticate('bearer', {session:false}), function(req,res){
            var offre = new Offre(req.body);
            offre.owner = ObjectId(req.params.id);
            offre.save(function(err,offre){
                if (err){
                    res.send(err);
                } 
                res.send(offre)               ;
    });
});

router.post('/publishOffer/:ido', passport.authenticate('bearer', {session:false}), function(req,res){
    Offre.findByIdAndUpdate(ObjectId(req.params.ido),{$set:{status:'Active'}},function(err,offre){
        if(err){
            res.send(err);
        }
        Offre.findById(ObjectId(req.params.ido)).exec(function(errr,offre){
            if(errr){
                res.send(errr);
            }
            res.send(offre);
        });
    });
});

router.post('/deleteOffer/:ido', passport.authenticate('bearer', {session:false}), function(req, res){
    Offre.findByIdAndUpdate(ObjectId(req.params.ido),{$set:{status:'Deleted'}}, function(err, offre){
        if (err){
            console.log(true)
            res.send(err)
        }
        Offre.findById(ObjectId(req.params.ido)).exec(function(errr,offre){
        if(errr){
            res.send(errr);
        }
        res.send(offre);
        });
    });
});

router.get('/getOffersByCompany/:idc',passport.authenticate('bearer', {session:false}), function(req, res){
    Offre.find({owner:ObjectId(req.params.idc)}).populate('owner').exec(function(err,offres){
        if(err){
            res.send(err);
        }
        res.send(offres)
    })
})
module.exports = router;