const Joi = require('joi');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
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
    // TODO: DATABASE SCHEMA
    plan: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal'
    },
    practices: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Practice'
    }
})

// JWT function must be declared before creating User model
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name }, 'jwtPrivateKey') // TODO: Hide jwtPrivateKey in env variable
    return token
}

const User = mongoose.model('User', userSchema)

// TODO: use Joi password module
function validateUser(User) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
      });
    
      return schema.validate(User);
}

module.exports.User = User; //export the User object
module.exports.validate = validateUser; //export the User object
