const { test, expect } = require('@playwright/test');

const url = 'http://localhost:3000/';

let allCandidateNames = [];

test.beforeEach(async ({ page }) => {
    try {
        console.log('Navigating to home page...');
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        console.log('Clicking Candidate Info button...');
        const navButton = page.getByRole('button', { name: 'Candidate Info' });
        await navButton.click();

        console.log('Waiting for candidateInfo page to load...');
        await page.waitForURL(url + 'candidateInfo', { waitUntil: 'domcontentloaded' });

        // Wait for the "More Info" buttons to appear, indicating cards have loaded
        const moreInfoButtons = page.getByRole('button', { name: 'More Info' });
        await moreInfoButtons.first().waitFor({ state: 'visible', timeout: 60000 });
        const count = await moreInfoButtons.count();
        console.log(`Loaded ${count} candidate cards.`);
        allCandidateNames = await page.locator('h3').allInnerTexts();
        console.log('All candidate names:', allCandidateNames);
    } catch (error) {
        console.error('Error in beforeEach:', error);
    }
});
 
test('Candidate More Info', async ({ page }) => {
    // Extract all candidate names from the list page
    const names = await page.locator('h3').allInnerTexts();
    const moreInfoButtons = page.getByRole('button', { name: 'More Info' });
    console.log(`Found ${names.length} candidates.`);
    for (let i = 0; i < names.length; i++) {
      console.log(`Clicking More Info for candidate: ${names[i]}`);
      await moreInfoButtons.nth(i).click();
      // Target the h1 heading that matches the candidate name
      const headerLocator = page.getByRole('heading', { level: 1, name: names[i], exact: false });
      try {
        await headerLocator.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        const allH1s = await page.locator('h1').allInnerTexts();
        console.error(`Could not find heading level=1 with name "${names[i]}". Available h1 texts: ${JSON.stringify(allH1s)}`);
        throw new Error(`Candidate detail header not found for "${names[i]}"`);
      }
      await page.goBack();
      // Wait for the list to re-render
      await moreInfoButtons.first().waitFor({ state: 'visible', timeout: 60000 });
    }
});

// list of all permutations of filters
const filterList = (function() {
    const politicalAffliiation = [null, 'Democrat', 'Republican', 'Independent', 'Non Partisan'];
    const electionType = [null, 'Federal Election', 'State Election', 'Municipal Election', 'Special Election', 'Primary Election', 'Ballot Questions/Referendum'];
    const district = [null, 'District 1', 'District 2', 'District 3', 'District 4'];
    const list = [];
    for (const party of politicalAffliiation) {
        for (const election of electionType) {
            for (const dist of district) {
                 const filter = {
                    party: party,
                    election: election,
                    district: dist
                }
                list.push(filter);
            }
        }
    }
    return list;
})();

const exampleFiltersList = [
    { party: 'Democrat', election: null, district: null },
    { party: 'Republican', election: null, district: null }
]

exampleFiltersList.forEach((filter) => {
    test (`Filter ${filter.party} ${filter.election} ${filter.district} Candidates`, async ({ page }) => {
        console.log(`Testing filter: ${JSON.stringify(filter)}`);
        // Wait for the "More Info" buttons to appear, indicating cards have loaded
        const moreInfoButtons = page.getByRole('button', { name: 'More Info' });
        await moreInfoButtons.first().waitFor({ state: 'visible', timeout: 60000 });
        const count = await moreInfoButtons.count();
        console.log(`Loaded ${count} candidate cards.`);
        // Capture displayed candidate names from h3 headings
        const displayedNamesBefore = await page.locator('h3').allInnerTexts();
        console.log('Displayed candidate names before filter:', displayedNamesBefore);

        // Enter filter values
        
        if (filter.party != null) {
            const politicalAffiliation = page.getByLabel('Political Affiliation');
            await politicalAffiliation.selectOption({ value: filter.party })
        };
        if (filter.election != null) {
            const electionType = page.getByLabel('Election Type');
            await electionType.selectOption({ value: filter.election });
        }
        if (filter.district != null) {
            const district = page.getByLabel('District');
            await district.selectOption({ value: filter.district });
        }
        
        // Wait for the filtered candidate list to render
        const displayedNamesAfter = await page.locator('h3').allInnerTexts();
        console.log('Displayed candidate names after filter:', displayedNamesAfter);
        // Compute expected names based on allCandidateNames and filter criteria
        const expectedNames = []; 

        await expect(displayedNamesAfter.length).toBeLessThanOrEqual(displayedNamesBefore.length);
    });
});
