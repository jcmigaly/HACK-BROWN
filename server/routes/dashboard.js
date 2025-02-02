const bcrypt = require('bcryptjs')
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const auth = require('../middleware/auth')
const { Prescription, validatePrescription, validateDelete } = require('../models/Prescription');


// Given a person logged in, if they have valid JWT, get all their info
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('The user with the given ID was not found')
    res.send(user)
})

// Add a single prescription to user 
router.post('/me', auth, async (req, res) => {
    const { error } = validatePrescription(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // TODO: ADD CALL TO API THAT GETS THE PILL PICTURE
    const user = await User.findById(req.user._id)
    user.prescriptions.push(req.body)

    await user.save()
    res.send(user)
})

// Delete a single prescription to user 
router.delete('/me', auth, async (req, res) => {
    const { error } = validateDelete(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // TODO: ADD CALL TO API THAT GETS THE PILL PICTURE
    const user = await User.findById(req.user._id)
    user.prescriptions = user.prescriptions.filter(prescription => prescription.name !== req.body.name);

    await user.save()
    res.send(user)
})

module.exports = router; //export the router object
