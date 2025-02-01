const Joi = require('joi');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Prescription = require('./Prescription');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    prescriptions: [Prescription.schema]
})

// JWT function must be declared before creating User model
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName }, 'jwtPrivateKey') // TODO: Hide jwtPrivateKey in env variable
    return token
}

const User = mongoose.model('User', userSchema)

function validateRegister(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
      });
    const { error, value } = schema.validate(user);
    console.log("Joi Validation Result:", { error, value });
    return { error, value };
    //   return schema.validate(user);
}

function validateLogin(User) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
      });
    
      return schema.validate(User);
}

module.exports.User = User; //export the User object
module.exports.validateRegister = validateRegister; //export the User object
module.exports.validateLogin = validateLogin; //export the User object

