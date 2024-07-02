const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Pizza', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
