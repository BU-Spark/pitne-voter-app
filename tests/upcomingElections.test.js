const { test, expect } = require('@playwright/test');

const url = 'http://localhost:3000/';

test.beforeEach(async ({ page }) => {
  await page.goto(url + 'upcomingElections');
  // Wait for at least one election card to render
  const eventCards = page.locator('div.w-full.max-w-\\[800px\\]');
  await eventCards.first().waitFor({ state: 'visible', timeout: 15000 });
});

test('All upcoming elections Add to Calendar buttons work', async ({ page }) => {
  // Locate all election cards
  const eventCards = page.locator('div.w-full.max-w-\\[800px\\]');
  const count = await eventCards.count();
  expect(count).toBeGreaterThan(0);
  
  for (let i = 0; i < count; ++i) {
    const card = eventCards.nth(i);
    // Extract election name from its distinctive styling
    const electionName = (await card.locator('div.text-\\[\\#D81624\\]').innerText()).trim();
    console.log(`Testing Add to Calendar for: ${electionName}`);
    
    // Click Add to Calendar button and await popup
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      card.getByRole('button', { name: /Add to Calendar/ }).click(),
    ]);
    // Log and loosely validate the popup URL, allowing for sign-in redirects
    const popupUrl = popup.url();
    console.log(`Popup URL: ${popupUrl}`);
    // Expect either the calendar render URL or a Google sign-in page with a continue to calendar
    expect(popupUrl).toMatch(/calendar\.google\.com|accounts\.google\.com/);
    await popup.close();
  }
});