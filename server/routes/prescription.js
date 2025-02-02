const _ = require('lodash')
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const auth = require('../middleware/auth')
const { Prescription, validatePrescription } = require('../models/Prescription');
const { getRxCUI, getSetID, getDrugImage } = require('../helpers/rxHelpers')

// Route to get setID using a drug name
router.get('/setid/:drugName', async (req, res) => {
    try {
        const { drugName } = req.params;

        // Get RxCUI from drug name
        const rxCUIResponse = await getRxCUI(drugName);
        const rxCUI = rxCUIResponse.idGroup.rxnormId?.[0]; // Extract RxCUI

        if (!rxCUI) {
            return res.status(404).json({ error: 'RxCUI not found for this drug' });
        }

        // Get setID using RxCUI
        const setIDResponse = await getSetID(rxCUI);
        const setID = setIDResponse.data?.[0]?.setid; // Extract setID

        if (!setID) {
            return res.status(404).json({ error: 'SetID not found for this RxCUI' });
        }

        res.json({ rxCUI, setID });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get drug image using RxCUI
router.get('/getDrugImage/:rxCUI', async (req, res) => {
    try {
        const { rxCUI } = req.params;
        const data = await getDrugImage(rxCUI);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch drug image" });
    }
});

// Add Prescription to User
router.post('/addPrescription', async (req, res) => {
    const { error } = validatePrescription(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const { userId, name, image, dosage } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.prescriptions.push({ name, image, dosage });
        await user.save();

        res.json({ message: "Prescription added successfully", prescriptions: user.prescriptions });
    } catch (error) {
        res.status(500).json({ error: "Error adding prescription" });
    }
});

module.exports = router; //export the router object