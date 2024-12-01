// Tests the api response with a valid API key
// Passes when mailchimp gives good response
it('should return a successful response from the Ping endpoint', async () => {

  // Set environment variables
  const apiKey = process.env.MAILCHIMP_API_KEY as string;
  const region = process.env.MAILCHIMP_REGION as string;
  const URL = `https://${region}.api.mailchimp.com/3.0/ping`;

  // Make the fetch call
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `auth ${apiKey}`,
    },
  });

  const data = await response.json();

  console.log("data", data);

  // Validate the response
  expect(response.ok).toBe(true);
  expect(data).toHaveProperty('health_status', "Everything's Chimpy!");
});




// Tests the api response with an invalid API key
// Passes when mailchimp gives bad response
it('should handle errors gracefully', async () => {

  // Set environment variables
  const apiKey = 'invalid-api-key' as string;
  const region = process.env.MAILCHIMP_REGION as string;
  const url = `https://${region}.api.mailchimp.com/3.0/ping`;


  // Make the fetch call
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `auth ${apiKey}`,
    },
  });

  const data = await response.json();

  console.log(data)

  // Simulate checking response in an actual app
  expect(response.ok).toBe(false);
  expect(data).toHaveProperty('title', 'Forbidden');
});
