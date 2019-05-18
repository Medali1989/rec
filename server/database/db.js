var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myproject', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully')
  } else {
    console.log('error while connection')
  }
});