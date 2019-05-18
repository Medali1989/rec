var mongoose = require('mongoose');
require('mongoose-type-email');



var profilSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emailContact : {type : mongoose.SchemaTypes.Email},
    phone : {type: String},
    birthDate : String,
    address : String, 
    pictureProfile : String,
    experience_professionnelle:[{post:String,companyName:String,descriptionJob:String,date_debut:String,date_fin:String}],
    educations: [{diplome:String,schoolName:String,date_debut:String,date_fin:String}],
    certifications: [{companyName:String,descriptionCertif:String,date_debut:String,date_fin:String}],
    skills:[String],
    languages:[String], 
    facebook: String,
    linkedIn: String,
    github: String,
    portfolio: String
});
module.exports = mongoose.model('Profil', profilSchema);