const bcrypt = require('bcryptjs')
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const auth = require('../middleware/auth')

//takes the id of a user in the database and returns all the meals for that user
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('The user with the given ID was not found')
    res.send(user)
})

module.exports = router; //export the router object
