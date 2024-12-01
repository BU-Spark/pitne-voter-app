import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ExpressURL, setGlobalDistrictNum } from '@/common';

// Set base URL for Axios
const api = axios.create({
    baseURL: ExpressURL,
});

// On submit, set the district to be the result of api call
interface DistrictFormProps {
    onFormSubmit: (district: string) => void;
}

const DistrictForm: React.FC<DistrictFormProps> = ({ onFormSubmit }) => {
    // Functions and variables to set district data
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [districtNum, setDistrictNum] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Error state

    // Call API when address is submitted
    const handleSubmit = async (event: React.FormEvent) => {
        // Reset past data
        event.preventDefault();
        setDistrictNum(null);
        setError(null); // Reset error

        // Set address
        const address = `${street} ${city}, ${state} ${zip}`;

        // Call API
        try {
            const response = await api.get('/api/district', {
                params: { address },
            });

            const data = response.data;

            // Set district number or error if no district number
            if (data) {
                setDistrictNum(data);
                setGlobalDistrictNum(data);
                onFormSubmit(data);
            } else {
                setError("ERROR FETCHING DISTRICT - ensure address is within Boston bounds");
            }
        } catch {
            setError("ERROR FETCHING DISTRICT - ensure address is within Boston bounds");
        }
    };

    // Address form
    return (
        <div className='flex flex-col justify-center items-center p-4 flex-wrap'>
            {/* Address form */}
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Street Number and Name"
                            variant="outlined"
                            fullWidth
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity("Boston")}
                            required
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            variant="outlined"
                            fullWidth
                            value={state}
                            onChange={(e) => setState("MA")}
                            required
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Zipcode"
                            variant="outlined"
                            fullWidth
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
                <div className="flex justify-center">
                    <Button type="submit" variant="outlined" className='p-3 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-blue-100'>
                        Submit Address
                    </Button>
                </div>
            </form>

            {/* Error message */}
            {error && (
                <Typography color="error" className='mt-4'>
                    {error}
                </Typography>
            )}
        </div>
    );
};

export default DistrictForm;
