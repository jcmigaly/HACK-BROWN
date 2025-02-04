const bcrypt = require('bcryptjs')
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User, validateRegister, validateLogin } = require('../models/User');

// POST: Register a new User
router.post('/', async (req, res) => {
    // Validate that the user has sent valid properties (name, email, password)
    const { error } = validateRegister(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // See if the user is trying to register with an email that is already in-use
    let user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).send('Email already in use')
    }

    // Create new User
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'prescriptions']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = user.generateAuthToken()

    // Send JWT to client header
   
    res.setHeader('x-auth-token', token)
    .send({user: _.pick(user, ['_id', 'name', 'email']), token: token})
})

// POST: Login User
router.post('/login', async (req, res) => {
    // Validate that the user has sent valid properties (name, email, password)
    const { error } = validateLogin(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // See if the user is trying to register with an email that is already in-use
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('No account associated with that email')
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(401).send('Incorrect password')
    }

    const token = user.generateAuthToken()
    // Send JWT to client header
    res.setHeader('x-auth-token', token)
        .send({user: _.pick(user, ['_id', 'name', 'email']), token: token})
        
})

module.exports = router; //export the router object
