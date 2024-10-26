/* Form asking for user address and getting polling location from Google Civic
 * API. Note: API key is in .env file
*/

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Streetview } from '@mui/icons-material';
import { deployedExpressURL, localExpressURL } from '@/common';


// Set base URL for Axios
const api = axios.create({
    baseURL: localExpressURL, // Point this to server URL
});


const AddressForm: React.FC = () => {
    // Functions and variables to set polling data
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [pollingLocation, setPollingLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pollingStreet, setPollingStreet] = useState<string | null>(null);
    const [pollingCity, setPollingCity] = useState<string | null>(null);
    const [pollingState, setPollingState] = useState<string | null>(null);
    const [pollingZip, setPollingZip] = useState<string | null>(null);
    
    const [pollingRoom, setPollingRoom] = useState<string | null>(null);
    const [pollingInstructions, setPollingInstructions] = useState<string | null>(null);

    // const [pollingHours, setPollingHours] = useState<string | null>(null);

    // Call API when address is submitted
    const handleSubmit = async (event: React.FormEvent) => {

        // Reset past data
        event.preventDefault();
        setPollingLocation(null);
        setPollingStreet(null);
        setPollingCity(null);
        setPollingState(null);
        setPollingZip(null);
        setPollingRoom(null);
        setPollingInstructions(null);
        // setPollingHours(null);
        setError(null);

        // Set address
        const address = `${street}, ${city}, ${zip}`;

        try {
            const response = await api.get('/api/precinct_info', {
                params: { address },
            });

            const data = response.data.properties;

            // Set polling location and hours or error if no polls
            if (data.USER_Ward != "" && data.USER_Precinct != "") {
                setPollingLocation(data.USER_Location2);
                setPollingStreet(data.USER_Location3);
                setPollingCity(data.USER_City);
                setPollingState(data.USER_State);
                setPollingZip(data.USER_ZipCode);

                setPollingRoom(data.USER_Voting_Roo);
                setPollingInstructions(data.USER_HP_Entrance);
                // setPollingHours(data.pollingLocations[0].pollingHours);
            } else {
                setError('Invalid Address or Address Format or Unsupported Location');
            }
        } catch (error) {
            setError('No polling location found for this address yet. Assigned polling locations are usually available 2-4 weeks before an election. Please check back later or re-enter the address to try again.');
        }
    };

    // Address form and displayed polling location
    return (
        <div className='flex flex-col justify-center items-center p-4 my-6 flex-wrap'>

            {/* Address form */}
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            label="Street"
                            variant="outlined"
                            fullWidth
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            type="text" // Street input as text
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text" // City input as text
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            type="number" // Zip code input as number
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
                <div className="flex justify-center">
                    <Button type="submit" variant="outlined" className='p-3 mt-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-blue-100'>
                        Submit Address
                    </Button>
                </div>
            </form>


            {/* Polling location if found, error if not */}
            {(pollingLocation || error) && (
                <div className='grid grid-cols-4 mt-8'>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                    <div className="space-y-4 lg:mx-10 md:mx-20 px-4 py-8 rounded-2xl shadow-2xl border border-gray-200 col-span-4 lg:col-span-2 bg-white">
                        <div className="space-y-4 w-full px-4">
                            <div className="w-full px-4 text-left text-xl">
                                {pollingLocation && (
                                    <div>
                                        <p>{pollingLocation}</p>
                                        <p>{pollingStreet}</p>
                                        <p>{pollingCity}, {pollingState}</p>
                                        <p>{pollingZip}</p>
                                        <br /><p><strong>Polling Instructions:</strong></p>
                                        <br /><p><strong>{pollingRoom}</strong></p>
                                        <p><strong>{pollingInstructions}</strong></p>
                                    </div>
                                )}
                                {error && (
                                    <Typography variant="h6" color="error">{error}</Typography>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;