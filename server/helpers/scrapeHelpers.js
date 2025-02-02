const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { setTimeout } = require('node:timers/promises');
const { model } = require('mongoose');

// Function to get drug interactions for an array of drugs
async function getDrugInteractions(prescriptions) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    let result = ''
    console.log('HERE1')
    await page.goto('https://www.drugs.com/drug_interactions.html');
    console.log('HERE2')
    for (let i = 0; i < prescriptions.length; i++) {
        const prescription = prescriptions[i];
        const drugName = prescription.name;
        try {
            // Type in the drug name into the search box and trigger the search
            if (i == 0) {
                console.log('HERE3')
                await page.type('#livesearch-interaction-basic', drugName); // Use the id selector
            } else {
                await setTimeout(500)
                await page.type('#livesearch-interaction', drugName); // Use the id selector
                await setTimeout(500)
            }
            console.log('HERE4')
            await page.waitForSelector('.ls-result', { visible: true }); 
            console.log('HERE5')
            await page.click('.ls-result a:first-of-type');
            console.log('HERE6')
            await page.waitForSelector('.ddc-table-interactions-list', { visible: true });
        } catch (error) {
            console.error(`Error scraping interactions for ${drugName}:`, error);
        }
    }
    console.log('HERE7')
    await setTimeout(1000)
    // Click the <a> element inside that <div>
    await page.click('#interaction_list div a.ddc-btn');
    await setTimeout(1000)
    // Close the browser after all drugs have been processed
    const html = await page.content();
    result = html
    await browser.close();
    let array = extractDrugInteractions(result)
    console.log(array)
    return array
}

function extractDrugInteractions(html) {
    console.log(html)
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

        // // Collect `.interactions-reference` divs when in the valid range
        // if (startCollecting && tagName === 'DIV' && $(element).hasClass('interactions-reference')) {
        //     const pElements = $(element)
        //         .find('p')
        //         .slice(0, 2)
        //         .map((i, p) => $(p).text().trim())
        //         .get();
            
        //     // Extract severity (major, minor, etc.) from a <span> inside this div
        //     const severity = $(element).find('span').first().text().trim();
        //     // interactionsDivs.push(pElements);
        //     // Store both extracted paragraphs and severity
        //     interactionsDivs.push({ severity, details: pElements });
        // }
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
    
    console.log(interactionsDivs)
    return interactionsDivs;
}

// getDrugInteractions([{name: "warfarin"}, {name: "advil"}])
  
module.exports.getDrugInteractions = getDrugInteractions
module.exports.extractDrugInteractions = extractDrugInteractions
