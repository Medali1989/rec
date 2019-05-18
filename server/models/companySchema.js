var mongoose = require('mongoose');
require('mongoose-type-email');

var companySchema = new mongoose.Schema({
    nameCompany : String,
    adress : String, 
    otherAdress : String, 
    emailCompany : {type:mongoose.SchemaTypes.Email, unique:true},
    phone : {type:String, unique:true},
    logo : String, 
    size: {type:String,enum: ['[0..9]','[10..99]','[100..999]','1000+']},
    webSite: String,
    facebook: String,
    linkedIn: String
});
module.exports = mongoose.model('Company', companySchema);