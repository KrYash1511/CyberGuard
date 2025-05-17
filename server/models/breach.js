const mongoose = require('mongoose');

const breachSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  name: { type: String },
  city: { type: String },
  state: { type: String }
});

module.exports = mongoose.model('Breach', breachSchema);
