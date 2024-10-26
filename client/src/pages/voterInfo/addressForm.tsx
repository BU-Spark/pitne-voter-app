import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { deployedExpressURL, localExpressURL } from '@/common';

// Set base URL for Axios
const api = axios.create({
    baseURL: localExpressURL, // Point this to server URL
});

interface PollingInfo {
    location: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    room: string | null;
    instructions: string | null;

    ward: number | null;
    precinct: number | null;

}

interface AddressFormProps {
    setPollingInformation: (info: PollingInfo) => void;
    setError: (error: string | null) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ setPollingInformation, setError }) => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');


    // load saved data from cookies into the component's state variables
    const loadSavedCookieData = () => {
        const savedAddress = Cookies.get('address');
        const savedPollingInfo = Cookies.get('pollingInfo');

        if (savedAddress) {
            const { street, city, zip } = JSON.parse(savedAddress);
            setStreet(street);
            setCity(city);
            setZip(zip);
        }

        if (savedPollingInfo) {
            setPollingInformation(JSON.parse(savedPollingInfo));
        }
    };

    // save component state variables into cookies
    const saveCookieData = (street: string, city: string, zip: string, pollingInfo: PollingInfo) => {
        // Save address to cookie only if successful response (valid address)
        Cookies.set('address', JSON.stringify({ street, city, zip }));

        // Save polling information to cookie (expires in 7 days)
        Cookies.set('pollingInfo', JSON.stringify(pollingInfo), { expires: 7 });
    };

    // Load saved address and pollingInfo from cookies if available
    useEffect(() => {
        loadSavedCookieData();
    }, []);

    // Call API when address is submitted
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Reset past data
        /*
        setPollingInformation({
            location: null,
            street: null,
            city: null,
            state: null,
            zip: null,
            room: null,
            instructions: null,

            ward: null,
            precinct: null,
        });
        */
        setError(null);

        const address = `${street}, ${city}, ${zip}`;

        try {
            const response = await api.get('/api/precinct_info', {
                params: { address },
            });
            const data = response.data.properties;

            if (data.USER_Ward != null && data.USER_Precinct != null) { // server responded
                const pollingInfo: PollingInfo = {
                    location: data.USER_Location2,
                    street: data.USER_Location3,
                    city: data.USER_City,
                    state: data.USER_State,
                    zip: data.USER_ZipCode,
                    room: data.USER_Voting_Roo,
                    instructions: data.USER_HP_Entrance,
                    ward: data.USER_Ward,
                    precinct: data.USER_Precinct
                };

                // Update state with polling information
                setPollingInformation(pollingInfo);

                // save data to cookies
                saveCookieData(street, city, zip, pollingInfo);

            } else {
                setError('Invalid Address or Address Format or Unsupported Location');
            }
        } catch (error) {
            loadSavedCookieData();
            setError("Server did not respond. Using cached data.");
            /* setError('No polling location found for this address yet. \
                Assigned polling locations are usually available 2-4 weeks before an election. \
                Please check back later or re-enter the address to try again.'); */
        }
    };

    return (
        <div className='flex flex-col justify-center items-center p-4 my-0 flex-wrap'>
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
                            type="text"
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
                            type="text"
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
                            type="number"
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
        </div>
    );
};

export default AddressForm;