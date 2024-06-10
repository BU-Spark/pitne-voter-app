import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

app.get('/api/lookup', async (req: Request, res: Response) => {
    const { address } = req.query;

    if (!address) {
        console.log("NEED ADDY");
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        console.log(`Addy: ${address}`);

        const response = await axios.get('https://www.googleapis.com/civicinfo/v2/voterinfo', {
            params: {
                address,
                key: process.env.GOOGLE_CIVIC_API_KEY,
                // electionId: 2000,
            },
        });

        console.log(response.data.pollingLocations[0]);

        res.status(200).json(response);
    } catch (error) {
        console.log("CAUGHT");
        res.status(500).json({ error: 'Error fetching polling location' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
