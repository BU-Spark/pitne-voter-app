const { test, expect } = require('@playwright/test');
const url = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
    try {
        await page.goto(url);
        console.log('Navigated to home page');

        const navButton = page.getByRole('banner').getByRole('button', { name: 'Drop Box Locations' });
        await navButton.click();
        console.log('Clicked Drop Box Locations button');

        await page.waitForURL(url + 'dropBoxLocations');
        console.log('Navigated to Drop Box Locations page');
    } catch (error) {
        console.error('Error in beforeEach:', error);
    }
});

test('Early Voting Locations Link', async ({ page }) => {
    console.log('Starting Early Voting Locations Link test');
    // 'popup' event is emitted when a new window or tab is opened via window.open
    const [popup] = await Promise.all([
        page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
        page.getByRole('button', { name: 'Early Voting Locations' }).click(),
    ]);
    if (!popup) {
        console.warn('Popup did not appear');
        return;
    }
    console.log('Popup opened:', popup.url());
    await expect(popup).toHaveURL('https://www.boston.gov/departments/elections/early-voting-boston#map--737516');
});

[
    { input: '700 Commonwealth Ave', expected: '700 Commonwealth Avenue, Boston, Massachusetts, 02215' },
    { input: 'Boston City Hall', expected: 'Boston City Hall' },
    { input: 'Boston Public Library', expected: 'Boston Public Library' },
].forEach((address) => {
    test(`Find Address or Place: ${address.input}`, async ({ page }) => {
        try {
            console.log(`Testing address input: ${address.input}`);
            // Locate the ArcGIS iframe by its placeholder text and get its Frame object
            const outerLocator = page.getByText('iFrames are not supported on');
            const frame = await outerLocator.contentFrame();
            if (!frame) throw new Error('Could not find ArcGIS content frame');

            const addressInput = frame.getByRole('searchbox', { name: 'Search' });
            await addressInput.waitFor({ state: 'visible', timeout: 10000 });
            await addressInput.fill(address.input);
            await addressInput.press('Enter');
            console.log('Submitted Search');
            await expect(frame.locator('article.container')).toBeVisible({ timeout: 5000 });
            await expect(frame.locator('.esri-search-result-renderer__more-results-item').filter({ hasNotText: 'Show more results'})).toHaveText(address.expected);
            console.log(`Address test passed for: ${address.input}`);
        } catch (error) {
            console.error(`Error in address test for ${address.input}:`, error);
        }
    });
});