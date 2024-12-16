const { test, expect } = require('@playwright/test');
const url = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
    await page.goto(url);

    // Navigate to the voting options page
    const navButton = page.getByRole('banner').getByRole('button', { name: 'Voting Options' });
    await navButton.click();
    await page.waitForURL(url + 'votingOptions');
});

[
    { name: 'Request Absentee Ballot', buttonName: 'Official Absentee Ballot Application', url: 'https://www.sec.state.ma.us/divisions/elections/download/absentee-ballot-applications/Absentee-Ballot-Application-English.pdf' },
    { name: 'Request Absentee Ballot', buttonName: 'Overseas Assistance', url: 'https://www.sec.state.ma.us/divisions/elections/voting-information/military-and-overseas-voters.htm'},
    { name: 'Mail-In Ballot', buttonName: 'Track Your Ballot', url: 'https://www.sec.state.ma.us/WhereDoIVoteMA/TrackMyBallot'},
    { name: 'In-Person Early Voting', buttonName: 'Early Voting Locations', url: 'https://www.boston.gov/departments/elections/early-voting-boston#map--737516' },
].forEach((votingOption) => {
    test(`Voting option: ${votingOption.buttonName}`, async ({ page }) => {
        await page.getByRole('button', { name: votingOption.name }).click();
        const button = await page.getByRole('button', { name: votingOption.buttonName });
        await expect(button).toBeVisible();
    
        // check button link
        const linkPromise = page.waitForEvent("popup");
        await button.click();
        const linkTab = await linkPromise;
        await expect(linkTab).toHaveURL(votingOption.url);
    });
});

[
    { name: 'Election Day voting', buttonName: 'Your Polling Location', url: url + 'votingOptions' },
    { name: 'Drop-Off Ballot', buttonName: 'Drop Box Locations', url: url + 'dropBoxLocations' },
].forEach((votingOption) => {
    test(`Voting option: ${votingOption.name}`, async ({ page }) => {
        await page.getByRole('button', { name: votingOption.name }).click();
        const button = await page.getByRole('region').getByRole('button', { name: votingOption.buttonName });
        await expect(button).toBeVisible();
        await button.click();
        page.waitForLoadState();
        await expect(page).toHaveURL(votingOption.url);
    });
});

