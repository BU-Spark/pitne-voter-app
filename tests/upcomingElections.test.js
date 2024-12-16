const { test, expect } = require('@playwright/test');

const url = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});


[
    { electionType: 'State Election', dateType: 'Registration Deadline' },
    { electionType: 'State Election', dateType: 'Election Day' },
    { electionType: 'General Election', dateType: 'Registration Deadline' },
    { electionType: 'General Election', dateType: 'Election Day' },
    { electionType: 'Governors Council', dateType: 'Registration Deadline' },
    { electionType: 'Governors Council', dateType: 'Election Day' }
].forEach(({ electionType, dateType }) => {
    test(`Add ${electionType} ${dateType} to Google Calendar`, async ({ page }) => {
        await page.waitForSelector('.event-card');
        const stateElectionCard = page.locator('.event-card').filter({ hasText: electionType });
        const stateElectionDate = await stateElectionCard.locator('>div>div').filter({ hasText: dateType });

        const googleCalendarPromise =  page.waitForEvent("popup");
        await stateElectionDate.getByRole('button').click();
        const googleCalendarTab = await googleCalendarPromise;
        await expect(googleCalendarTab).toHaveURL("https://workspace.google.com/intl/en-US/products/calendar/");
        await googleCalendarTab.close();
    });
});