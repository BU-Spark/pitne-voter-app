/* Backend for Voter Info API call (see client/pages/voterInfo for frontend) */

import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001
// process.env.PORT || 3001

app.use(cors()); // Needed to send data back to frontend

app.get('/api/lookup', async (req: Request, res: Response) => {
    const { address } = req.query;

    // No address check (should be unnecessary b/c form validation)
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        // Get data from API
        const response = await axios.get('https://www.googleapis.com/civicinfo/v2/voterinfo', {
            params: {
                address,
                key: process.env.GOOGLE_CIVIC_API_KEY,
            },
        });

        // Send data back to frontend
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching polling location' });
    }
});

app.get('', (req: Request, res: Response) => {
    res.send('Hello from the Voter Info API!');
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
