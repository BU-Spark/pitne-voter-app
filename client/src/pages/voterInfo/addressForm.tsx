/* Form asking for user address and getting polling location from Google Civic
 * API. Note: API key is in .env file
*/

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';


// Set base URL for Axios
const api = axios.create({
    baseURL: 'http://localhost:3001', // Point this to your server URL
});


const AddressForm: React.FC = () => {
    const [address, setAddress] = useState('');
    const [pollingLocation, setPollingLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    //add another one for setting the address of the polling location

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPollingLocation(null);
        setError(null);

        console.log("Address: " + address);

        try {
            const response = await api.get('/api/lookup', {
                params: { address },
            });

            console.log("CHECK");

            const data = response.data;

            if (data.pollingLocations && data.pollingLocations.length > 0) {
                setPollingLocation(data.pollingLocations[0].address.locationName);
                //set the address of the polling location here
            } else {
                setPollingLocation('No polling location found for this address.');
            }
            
        } catch (error) {
            setError('Error fetching polling location. Please try again.');
        }
    };

    // Address form and displayed polling location
    return (
        <div className='flex flex-col justify-center items-center p-4 my-6'>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 300 }}>
            <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="outlined" className='p-3 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-blue-100'>
                Submit Address
            </Button>
            </form>

            {/* Polling location if found, error if not */}
            {pollingLocation && (
                <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
                    Polling Location: {pollingLocation}
                </Typography>
            )}
            {error && (
                <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
      </div>
  );
};

export default AddressForm;