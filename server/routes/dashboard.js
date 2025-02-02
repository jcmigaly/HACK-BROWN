const bcrypt = require('bcryptjs')
const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const auth = require('../middleware/auth')
const { Prescription, validatePrescription, validateDelete } = require('../models/Prescription');
const { getDrugInteractions, extractDrugInteractions } = require('../helpers/scrapeHelpers')
const { Interaction } = require('../models/Interaction')


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
    const user = await User.findById(req.user._id)
    // Check if the prescription already exists by name
    const prescriptionExists = user.prescriptions.some(prescription => prescription.name === req.body.name);

    if (prescriptionExists) {
        return res.status(400).send("Prescription with this name already exists.");
    }
    user.prescriptions.push(req.body)

    let interactionsArray = await getDrugInteractions(user.prescriptions)
    user.interactions = []

    interactionsArray.forEach((item) => {
        // Remove first 11 characters
        let cleanedText = item.category.substring(11);
        // Split on ',' and trim whitespace
        let drugs = cleanedText.split(',').map(drug => drug.trim());
        if (!drugs[1]) {
            return; // This will skip the current iteration and move to the next item in the loop
        }
        let curr_interaction = new Interaction({
            name1: drugs[0],
            name2: drugs[1],
            level: item.level,  // Assuming level corresponds to severity
            description: item.description
        });
        user.interactions.push(curr_interaction)
    })
    await user.save()
    res.send(user.interactions)
})

// Delete a single prescription to user 
router.delete('/me', auth, async (req, res) => {
    const { error } = validateDelete(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findById(req.user._id)
    user.prescriptions = user.prescriptions.filter(prescription => prescription.name !== req.body.name);

    interactionsArray = user.interactions.filter((item) => {
        // Check if the condition is true for this item
        return !(
            item.name1.toLowerCase().includes(req.body.name.toLowerCase()) || 
            item.name2.toLowerCase().includes(req.body.name.toLowerCase())
        );
    });
    user.interactions = interactionsArray;
    
    await user.save()
    res.send(user)
})

// Calculate all prescriptions 
router.post('/all', auth, async (req, res) => {
    const user = await User.findById(req.user._id)

    let interactionsArray = await getDrugInteractions(user.prescriptions)
    user.interactions = []

    interactionsArray.forEach((item) => {
        // Remove first 11 characters
        let cleanedText = item.category.substring(11);
        // Split on ',' and trim whitespace
        let drugs = cleanedText.split(',').map(drug => drug.trim());
        if (!drugs[1]) {
            return; // This will skip the current iteration and move to the next item in the loop
        }
        let curr_interaction = new Interaction({
            name1: drugs[0],
            name2: drugs[1],
            level: item.level,  // Assuming level corresponds to severity
            description: item.description
        });
        user.interactions.push(curr_interaction)
    })
    await user.save()
    res.send(user.interactions)
})

module.exports = router; //export the router object
