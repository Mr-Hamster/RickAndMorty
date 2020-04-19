const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachment'
  },
  location: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);