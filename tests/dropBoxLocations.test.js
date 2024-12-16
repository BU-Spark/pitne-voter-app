const { test, expect } = require('@playwright/test');
const url = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
    await page.goto(url);

    // Navigate to the drop box locations page
    const navButton = page.getByRole('banner').getByRole('button', { name: 'Drop Box Locations' });
    await navButton.click();
    await page.waitForURL(url + 'dropBoxLocations');
});

test('Early Voting Locations Link', async ({ page }) => {
    // check button link
    const linkPromise = page.waitForEvent("popup");
    await page.getByRole('button', { name: 'Early Voting Locations' }).click();
    const linkTab = await linkPromise;
    await expect(linkTab).toHaveURL('https://www.boston.gov/departments/elections/early-voting-boston#map--737516');
});


[
    { input: '700 Commonwealth Ave', expected: '700 Commonwealth Avenue, Boston, Massachusetts, 02215' },
    { input: 'Boston City Hall', expected: 'Boston City Hall' },
    { input: 'Boston Public Library', expected: 'Boston Public Library' },
].forEach((address) => {
    test(`Find Address or Place: ${address.input}`, async ({ page }) => {
        const iframe = await page.locator('iframe').contentFrame();
        const addressInput = await iframe.getByPlaceholder('Find address or place');
        await addressInput.fill(address.input);
        await iframe.getByRole('button', { name: 'Search', exact: true }).click();
        await expect(iframe.locator('article.container')).toBeVisible();
        await expect(iframe.locator('.esri-search-result-renderer__more-results-item').filter({ hasNotText: 'Show more results'})).toHaveText(address.expected);
    });
});