const bcrypt = require('bcryptjs')
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/User');

// POST: Register a new User
router.post('/', async (req, res) => {
    // Validate that the user has sent valid properties (name, email, password)
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // See if the user is trying to register with an email that is already in-use
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('Email already in use')
    }

    // TODO: Handle populating plan and practices. Call to another API or have helper function?

    // Create new User
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = user.generateAuthToken()

    // Send JWT to client header
    res
        .header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router; //export the router object
