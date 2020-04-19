const mongoose = require('mongoose');

const attachmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fileUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Attachment', attachmentSchema);