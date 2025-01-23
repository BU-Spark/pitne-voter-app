/* Backend for Voter Info API call (see client/pages/voterInfo for frontend) */

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import getPrecinct from './get_precinct.js';

dotenv.config();

const app = express();


const port = process.env.PORT || 3001;
// const port = 3001;;

app.use(cors()); // Needed to send data back to frontend
app.use(bodyParser.json());



// API call for precinct info
app.get('/api/precinct_info', async (req, res) => {
    const address = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const precinct_info = await getPrecinct(address);
        return res.status(200).json(precinct_info);

    } catch (error) {
        return res.status(500).json({ error: 'Error fetching polling location' });
    }
});


/************************************************************* MOST LIKELY UNUSED CODE **************************************************/

// API call for polling location
app.get('/api/lookup', async (req, res) => {
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


/* API call for district number (1-9) 
 * NOTE: Google Civic API is turning down the Representatives API in April 2025,
 * so the below API call will need to be updated to their new system after
*/
app.get('/api/district', async (req, res) => {
    const { address } = req.query;

    // No address check (should be unnecessary b/c form validation)
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        // Get data from API
        const response = await axios.get('https://civicinfo.googleapis.com/civicinfo/v2/representatives', {
            params: {
                address,
                key: process.env.GOOGLE_CIVIC_API_KEY,
            },
        });

        const divisions = response.data.divisions;

        // Extract the council district number
        const councilDistrictKey = Object.keys(divisions).find(key => key.includes('council_district'));
        let councilDistrictNumber = null;

        if (councilDistrictKey) {
            // Only looking for district numbers 1-9 for Boston
            const match = councilDistrictKey.match(/council_district:(\d)/);

            if (match && match[1]) {
                // Set variable to the extracted digit
                councilDistrictNumber = match[1];
            }
        }

        // Send data back to frontend
        res.status(200).json(councilDistrictNumber);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching district' });
    }
});

app.get('', (req, res) => {
    res.send('Get request to the Voter Info API!');
});

app.post('', (req, res) => {
    res.send('POST request to the Voter Info API!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
