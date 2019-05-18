var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/db');
var app = express();
var cors = require('cors');
var passport = require('./passport/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var publicDir  = require('path').join(__dirname, '/upload');
app.use(express.static(publicDir));

var profilApi = require('./api/profilApi');
var companyApi = require('./api/companyApi');
var UserApi = require('./api/userApi');
var OffreApi = require('./api/offerApi');
app.use(cors());

app.use('/Profil',profilApi);
app.use('/Company',companyApi);
app.use('/User', UserApi);
app.use('/Offre', OffreApi);




app.listen(4000);