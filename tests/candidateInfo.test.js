const { test, expect } = require('@playwright/test');

const url = 'http://localhost:3000/';


test.beforeEach(async ({ page }) => {
    await page.goto(url);
    
    // navigate to candidate info page
    const navButton = page.getByRole('banner').getByRole('button', { name: 'Candidate Info' });
    await navButton.click();
    await page.waitForURL(url + 'candidateInfo');
});

test ('Candidate More Info', async ({ page }) => {
    // Get all candidates
    await page.waitForSelector('.candidate-card');
    const candidateList = await page.locator('.candidate-card').all();
    for (const candidate of candidateList) {
        const candidateName = await candidate.getByRole('heading').innerText();
        await candidate.getByRole('button').click();
        await expect.soft(page.getByRole('heading').first()).toHaveText(candidateName);
        await page.goBack();
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
        // Get all candidate info
        await page.waitForSelector('.candidate-card');
        const candidateList = await page.locator('.candidate-card').all();
        var candidateInfoList = [];
        for (const candidate of candidateList) {
            const candidateName = await candidate.getByRole('heading').innerText();
            const candidateParty = await candidate.locator('p').filter({ hasText: 'Party' }).innerText();
            const candidateOffice = await candidate.locator('p').filter({ hasText: 'Office' }).innerText();
            const candidateDistrict = await candidate.locator('p').filter({ hasText: 'District' }).innerText();
            const candidateElection = await candidate.locator('p').filter({ hasText: 'Election' }).innerText();
            const candidateInfo = {
                name: candidateName,
                party: candidateParty.replace('Party: ', ''),
                office: candidateOffice.replace('Office: ', ''),
                district: candidateDistrict.replace('District: ', ''),
                election: candidateElection.replace('Election: ', '')
            }
            candidateInfoList.push(candidateInfo);
        }

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
        
        // Filter candidates
        const filteredCandidateInfoList = candidateInfoList.filter(candidate => 
            (filter.party != null ? candidate.party === filter.party : true) &&
            (filter.election != null ? candidate.election === filter.election : true) && 
            (filter.district != null ? candidate.district === filter.district : true)
        );

        // Check that the filtered candidates match the displayed candidates
        await expect(page.locator('.candidate-card')).toHaveCount(filteredCandidateInfoList.length);
        const filteredCandidateList = await page.locator('.candidate-card').all();
        for (const candidate of filteredCandidateList){
            const candidateName = await candidate.getByRole('heading').innerText();
            const isCandidateInList = filteredCandidateInfoList.some(filteredCandidate => filteredCandidate.name === candidateName);
            await expect(isCandidateInList).toBe(true);
        }
    });
});

