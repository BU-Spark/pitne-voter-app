import type { NextApiRequest, NextApiResponse } from 'next';

// This is the API handler for subscribing a user to a Mailchimp mailing list.
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Parse the request body. If it's a string, convert it to a JSON object.
	const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
	const { email } = body;

	// console.log("this is the email:", email);

	// Validate that the email exists in the request body.
	if (!email) {
		// Respond with a 401 error if the email is not provided.
		res.status(401).json({ error: 'Email is required' });
		return;
	}

	// Prepare the data to be sent to the Mailchimp API.
	const mailChimpData = {
		members: [
			{
				email_address: email, // The email address to subscribe.
				status: 'subscribed', // Subscription status.
			},
		],
	};

	try {
		// Retrieve Mailchimp credentials from environment variables.
		const audienceId = process.env.MAILCHIMP_AUDIENCE_ID as string;
		const apiKey = process.env.MAILCHIMP_API_KEY as string;
		const region = process.env.MAILCHIMP_REGION as string;

		// Construct the Mailchimp API URL for the specific audience.
		const URL = `https://${region}.api.mailchimp.com/3.0/lists/${audienceId}`;

		// Make a POST request to the Mailchimp API to add the user to the audience list.
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				Authorization: `auth ${apiKey}`, // Provide the API key for authorization.
			},
			body: JSON.stringify(mailChimpData), // Send the prepared data as the request body.
		});

		// Parse the response from Mailchimp.
		const data = await response.json();

		// console.log(JSON.stringify(mailChimpData));
		// console.log(data);

		// Handle errors in the Mailchimp response.
		if (data.errors[0]?.error) {
			res.status(401).json({ error: data.errors[0].error });
		} else {
			// Respond with a success status if the request was successful.
			res.status(200).json({ success: true });
		}
	} catch (e) {
		res.status(401).json({ error: 'Something went wrong, please try again later.' });
	}
}