const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  status: String,
  location: String,
  messages: [String]
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
