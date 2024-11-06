import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
	const { email } = body;

	// console.log("this is the email:", email);

	if (!email) {
		res.status(401).json({ error: 'Email is required' });
		return;
	}

	const mailChimpData = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
			},
		],
	};

	try {
		const audienceId = process.env.MAILCHIMP_AUDIENCE_ID as string;
		const apiKey = process.env.MAILCHIMP_API_KEY as string;
		const region = process.env.MAILCHIMP_REGION as string;
		// console.log(audienceId, apiKey, region);
		const URL = `https://${region}.api.mailchimp.com/3.0/lists/${audienceId}`;
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				Authorization: `auth ${apiKey}`,
			},
			body: JSON.stringify(mailChimpData),
		});
		// console.log(JSON.stringify(mailChimpData));

		const data = await response.json();
		// console.log(data);
		// Error handling.
		if (data.errors[0]?.error) {
			res.status(401).json({ error: data.errors[0].error });
		} else {
			res.status(200).json({ success: true });
		}
	} catch (e) {
		res.status(401).json({ error: 'Something went wrong, please try again later.' });
	}
}