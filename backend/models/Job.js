const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  category: String,
  description: String,
  location: String,
  budget: String,
  preferredDate: String,
  contactName: String,
  contactPhone: String,
  contactEmail: String,
  imageFiles: [String], // file names only
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
