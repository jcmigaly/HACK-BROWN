const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { setTimeout } = require('node:timers/promises');
const { model } = require('mongoose');

// Function to get drug interactions for an array of drugs
async function getDrugInteractions(prescriptions) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    let result = ''
    await page.goto('https://www.drugs.com/drug_interactions.html');
    for (let i = 0; i < prescriptions.length; i++) {
        const prescription = prescriptions[i];
        const drugName = prescription.name;
        try {
            // Type in the drug name into the search box and trigger the search
            if (i == 0) {
                await setTimeout(500)
                await page.type('#livesearch-interaction-basic', drugName); // Use the id selector
            } else {
                await setTimeout(500)
                await page.type('#livesearch-interaction', drugName); // Use the id selector
                await setTimeout(500)
            }
            await page.waitForSelector('.ls-result', { visible: true }); 
            await page.click('.ls-result a:first-of-type');
            await page.waitForSelector('.ddc-table-interactions-list', { visible: true });
        } catch (error) {
            console.error(`Error scraping interactions for ${drugName}:`, error);
        }
    }
    await setTimeout(1000)
    // Click the <a> element inside that <div>
    await page.click('#interaction_list div a.ddc-btn');
    await setTimeout(1000)
    // Close the browser after all drugs have been processed
    const html = await page.content();
    result = html
    await browser.close();
    let array = extractDrugInteractions(result)
    return array
}

function extractDrugInteractions(html) {
    const $ = cheerio.load(html);
    const interactionsDivs = [];
    let startCollecting = false;

    // Narrow the scope to the `.ddc-main-content` container
    $('.ddc-main-content').find('h2, .interactions-reference').each((index, element) => {
        const tagName = $(element).prop('tagName');
        const text = $(element).text().trim();

        if (tagName === 'H2' && text === 'Interactions between your drugs') {
            startCollecting = true;
        } else if (tagName === 'H2' && text === 'Drug and Food Interactions') {
            startCollecting = false;
        }

        if (startCollecting && tagName === 'DIV' && $(element).hasClass('interactions-reference')) {
            const pElements = $(element).find('p').slice(0, 2).map((i, p) => $(p).text().trim()).get();
            
            if (pElements.length === 2) {
                const severity = $(element).find('span').first().text().trim(); // Extract severity label
        
                interactionsDivs.push({
                    category: pElements[0],   // First paragraph = Drug-drug category
                    description: pElements[1], // Second paragraph = Interaction description
                    level: severity || "Unknown" // Default to "Unknown" if no severity found
                });
            }
        }
    });
    
    return interactionsDivs;
}
  
module.exports.getDrugInteractions = getDrugInteractions
module.exports.extractDrugInteractions = extractDrugInteractions
