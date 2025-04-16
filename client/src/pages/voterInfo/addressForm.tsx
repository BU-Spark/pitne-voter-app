import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { ExpressURL } from '@/common';

const api = axios.create({
    baseURL: ExpressURL,
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
    const [saveAddress, setSaveAddress] = useState(false);

    const loadSavedCookieData = () => {
        const savedAddress = Cookies.get('address');
        const savedPollingInfo = Cookies.get('pollingInfo');

        if (savedAddress) {
            const { street, city, zip } = JSON.parse(savedAddress);
            setStreet(street);
            setCity(city);
            setZip(zip);
            setSaveAddress(true);
        }

        if (savedPollingInfo) {
            setPollingInformation(JSON.parse(savedPollingInfo));
        }
    };

    const saveCookieData = (street: string, city: string, zip: string, pollingInfo: PollingInfo) => {
        const consent = Cookies.get('cookieConsent');
        if (consent === 'accepted') {
            if (saveAddress) {
                Cookies.set('address', JSON.stringify({ street, city, zip }));
            } else {
                Cookies.remove('address');
            }

            Cookies.set('pollingInfo', JSON.stringify(pollingInfo), { expires: 7 });
            Cookies.set('zipCode', zip, { expires: 7 });
        }
    };

    useEffect(() => {
        loadSavedCookieData();
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSaveAddress(isChecked);

        if (!isChecked) {
            Cookies.remove('address');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const address = `${street}, ${city}, ${zip}`;

        try {
            const response = await api.get('/api/precinct_info', {
                params: { address },
            });

            const data = response.data.properties;

            if (data.USER_Ward != null && data.USER_Precinct != null) {
                const pollingInfo: PollingInfo = {
                    location: data.USER_Location2,
                    street: data.USER_Location3,
                    city: data.USER_City,
                    state: data.USER_State,
                    zip: data.USER_ZipCode,
                    room: data.USER_Voting_Roo,
                    instructions: data.USER_HP_Entrance,
                    ward: data.USER_Ward,
                    precinct: data.USER_Precinct,
                };

                setPollingInformation(pollingInfo);
                saveCookieData(street, city, zip, pollingInfo);
            } else {
                setError('Invalid Address or Address Format or Unsupported Location');
            }
        } catch (error) {
            saveCookieData(street, city, zip, {
                location: null,
                street: street,
                city: city,
                state: null,
                zip: zip,
                room: null,
                instructions: null,
                ward: null,
                precinct: null,
            });

            loadSavedCookieData();
            setError("No polling location found for this address yet. Please check back later or re-enter the address to try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center p-4 my-0 flex-wrap">
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 820 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Street"
                            variant="outlined"
                            fullWidth
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            type="text"
                            InputProps={{ style: { backgroundColor: 'white' } }}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            InputProps={{ style: { backgroundColor: 'white' } }}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            type="number"
                            InputProps={{ style: { backgroundColor: 'white' } }}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={saveAddress}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                    sx={{
                                        color: 'primary',
                                        '&.Mui-checked': {
                                            color: 'red',
                                        },
                                        '& .MuiSvgIcon-root': { // Target the SVG icon inside Checkbox
                                            color: 'black',      // Default color of the checkbox outline
                                        },
                                    }}
                                />
                            }
                            label="Remember Address"
                        />
                    </Grid>
                </Grid>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        variant="outlined"
                        className="p-3 mt-4 rounded-full bg-white text-black border-black hover:bg-red-600"
                    >
                        Submit Address
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;