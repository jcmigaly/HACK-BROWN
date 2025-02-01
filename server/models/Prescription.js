const mongoose = require('mongoose');

// Define Prescription Schema
const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL or path to image
    required: true
  },
  dosage: {
    type: String,
    required: true
  }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;  // Export the model