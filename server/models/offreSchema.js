var mongoose = require('mongoose');

var offreSchema = new mongoose.Schema({
    post : String, 
    type_job:[{type:String,enum:['CDI','CDD','Freelance','SIVP','certification']}],
    time_job:[{type:String,enum:['full-time','part-time']}],
    job_description : String,
    status : {type:String, enum:['Active','Deleted','Draft'],default:'Draft'},
    skills:[{skill:String}],
    owner : {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    applied_profiles : [{type:mongoose.Schema.Types.ObjectId,ref:'Profil', unique:true}]
});

module.exports = mongoose.model('Offre', offreSchema);