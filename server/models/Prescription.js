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

function validatePrescription(prescription) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        dosage: Joi.string().min(1).max(100).required()
    });

    return schema.validate(prescription);
}

module.exports.Prescription = Prescription;  // Export the model
module.exports.validatePrescription = validatePrescription