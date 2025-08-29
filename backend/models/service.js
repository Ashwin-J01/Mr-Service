const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  description: String,
  priceRange: String,
  availability: String,
  contact: String,
  email: String,
  workSamples: [String],
  rating: Number,
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: String,
    }
  ],
});

module.exports = mongoose.model('Service', ServiceSchema);
