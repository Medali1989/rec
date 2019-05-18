var mongoose = require('mongoose');
require('mongoose-type-email');



var userSchema = new mongoose.Schema({
    email : {type : mongoose.SchemaTypes.Email, unique:true},
    password : String,
    role : String,
    profile : {type:mongoose.Schema.Types.ObjectId,ref:'Profil'},
    company : {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    gender : {type:String,enum:['male','female']},
});
module.exports = mongoose.model('User', userSchema);