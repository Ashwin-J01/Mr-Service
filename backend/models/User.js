const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  about: String,
  password: String,
  role: { type: String, default: 'provider' } // or 'client' if needed
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
