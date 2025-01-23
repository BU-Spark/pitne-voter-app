const { test, expect } = require('@playwright/test');
const url = 'http://localhost:3000/';

[
    { 
        street: '700 Commonwealth Ave', 
        city: 'Boston', 
        zip: '02215', 
        ward: '21', 
        precinct: '2', 
    },
    // Boston Public Market
    {
        street: '100 Hanover St',
        city: 'Boston',
        zip: '02108',
        ward: '3',
        precinct: '6',
    },
    // Boston College
    {
        street: '140 Commonwealth Ave',
        city: '',
        zip: '02467',
        ward: '21',
        precinct: '16',
    }
].forEach((address) => {
    test(`Get Ballot Info From Address ${address.street}`, async ({ page }) => {
        await page.goto(url);

        // navigate to voter info page
        const navButton = page.getByRole('banner').getByRole('button', { name: 'Your Voter Info' });
        await navButton.click();
        await page.waitForURL(url + 'voterInfo');

        // Check page heading
        await page.isVisible('text=Your Voter Info');

        // fill in address info
        const streetInput = page.getByLabel('Street');
        await streetInput.fill(address.street);
        const cityInput = page.getByLabel('City');
        await cityInput.fill(address.city); 
        const zipInput = page.getByLabel('Zip');
        await zipInput.fill(address.zip);

        // submit address
        await page.getByRole('button', { name: 'Submit Address' }).click();

        // check ballot info
        await expect(page.getByText(`Your Ward: ${address.ward}`)).toBeVisible();
        await expect(page.getByText(`Your Precinct: ${address.precinct}`)).toBeVisible();
    
        // check ballot link
        const ballotPromise =  page.waitForEvent("popup");
        await page.getByRole('link', { name: 'View Your Ballot' }).click();
        const ballotTab = await ballotPromise;
        await expect(ballotTab).toHaveURL(`https://www.sec.state.ma.us/WhereDoIVoteMA/ShowBallot/ViewMyBallot/BallotOut/ST/35/${address.ward}/${address.precinct}`);
    });
});