const mongoose = require('mongoose');
const Joi = require('joi');

// Define Prescription Schema
const interactionSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: true
  },
  name2: {
    type: String, // URL or path to image
  },
  level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Interaction = mongoose.model('Interaction', interactionSchema);

function validateInteraction(interaction) {
    const schema = Joi.object({
        name1: Joi.string().min(1).max(100).required(),
        name2: Joi.string().min(1).max(100).required(),
        level: Joi.string().min(1).max(100).required(),
        description: Joi.string().min(1).required()
    });

    return schema.validate(interaction);
}

function validateDeleteInteraction(interaction) {
  const schema = Joi.object({
      name: Joi.string().min(1).max(100).required(),
  });

  return schema.validate(interaction);
}


module.exports.Interaction = Interaction;  // Export the model
module.exports.validateInteraction = validateInteraction
module.exports.validateDeleteInteraction = validateDeleteInteraction