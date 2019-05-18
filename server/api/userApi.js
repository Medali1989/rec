var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Types.ObjectId;
var Profil = require('../models/profilSchema');
var Company = require('../models/companySchema');
var User = require('../models/userSchema');
var auth = require('../auth/auth-jwt').authenticate;
var jwt = require ('jsonwebtoken');
var passport = require('passport');

router.post('/registerProfil', function(req,res){
    profil = new Profil();
    profil.firstName = req.body.firstName;
    profil.lastName = req.body.lastname;
    var user = new User();
    user.email = req.body.email;
    user.password=bcrypt.hashSync(req.body.password);
    user.profile = profil._id;
    user.role = 'profil';
    user.gender = req.body.gender;
    user.save(function(err,user){
        if (err){
            res.send(err);
        }
        if(user){
            profil.save(function(errr,profil){
                if(errr){
                    res.send(errr);
                }
                else{
                    res.send(profil);
                }
            });
        }
    });    
});

router.post('/registerCompany', function(req,res){
    var company = new Company();
    company.nameCompany = req.body.nameCompany;
    company.adress = req.body.adress;
    company.otherAdress = req.body.otherAdress;
    company.emailCompany = req.body.email;
    company.phone = req.body.phone;
    company.logo = req.body.logo;
    company.size = req.body.size;
    company.webSite = req.body.webSite;
    company.facebook = req.body.facebook;
    company.linkedIn = req.body.linkedIn;
    var user = new User();
    user.email = req.body.email;
    user.role = 'company';
    user.password=bcrypt.hashSync(req.body.password);
    user.company = company._id;
    user.save(function(err,user){
        if (err){
            res.send(err);
        }
        if(user){
            company.save(function(errr,company){
                if(errr){
                    res.send(errr);
                }
                else{
                    res.send(user);
                }
            });
        }
    });    
});

router.post('/Login', function(req,res){
    User.findOne({email:req.body.email}).exec(function(err,user){
        if (err){
            res.send(err);
        }
        if(!user){
            res.send({message :'Verif your email!!'});
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                var token = jwt.sign({data:user}, 's3cr3t', {expiresIn:3600});
                res.send({success:"true", access_token:token});
            }
            else{
                res.send({message :'wrong password!!'});
            }
        }
    })
});

router.post('/ReloadToken/:email', function (req,res){
    console.log(req.params.email);
    User.findOne({email:req.params.email}).exec(function (err, user){
        if (err){
            res.send(err)
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            var token = jwt.sign({data:user}, 's3cr3t', {expiresIn:3600});
            res.send({success:"true", access_token:token});
        }
        else{
            res.send({message :'wrong password!!'});
        }
    })
})
router.get('/Getbyemail/:email', function(req,res){
    User.findOne({email:req.params.email}, function(err, user){
        if(err){
            res.send(err);
        }
        if(!user){
            res.send(true);
        }else{
            res.send(false);
        }
    })
})
module.exports = router;