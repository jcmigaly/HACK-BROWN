const axios = require('axios');

// Get RxCUI for a drug name
async function getRxCUI(drugName) {
    try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching RxCUI:", error.message);
        throw error;
    }
}

// Get setID using RxCUI
async function getSetID(rxCUI) {
    try {
        const response = await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/rxcuis/${rxCUI}/spls.json`);
        return response.data;
    } catch (error) {
        console.error("Error fetching setID:", error.message);
        throw error;
    }
}

// Get drug image using RxCUI
async function getDrugImage(setID) {
    try {
        const response = await axios.get(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/${setID}/media.json`);
        return response.data;
    } catch (error) {
        console.error("Error fetching drug image:", error.message);
        throw error;
    }
}

// Export all functions
module.exports = { getRxCUI, getSetID, getDrugImage };
