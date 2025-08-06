import React, { useState, useEffect, useCallback, startTransition } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Alert } from '@mui/material';
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
    const [zip, setZip] = useState('');
    const [saveAddress, setSaveAddress] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadSavedCookieData = useCallback(() => {
        const savedAddress = Cookies.get('address');
        const savedPollingInfo = Cookies.get('pollingInfo');

        if (savedAddress) {
            const { street, zip } = JSON.parse(savedAddress);
            setStreet(street);
            setZip(zip);
            setSaveAddress(true);
        }

        if (savedPollingInfo) {
            const parsedPollingInfo: PollingInfo = JSON.parse(savedPollingInfo);
            startTransition(() => {
                setPollingInformation(parsedPollingInfo);
            });
        }
    }, [setPollingInformation]);

    const saveCookieData = (street: string, zip: string, pollingInfo: PollingInfo) => {
        const consent = Cookies.get('cookieConsent');
        if (consent === 'accepted') {
            if (saveAddress) {
                Cookies.set('address', JSON.stringify({ street, zip }), { expires: 7 });
            } else {
                Cookies.remove('address');
            }

            Cookies.set('pollingInfo', JSON.stringify(pollingInfo), { expires: 7 });
            Cookies.set('zipCode', zip, { expires: 7 });
        }
    };

    useEffect(() => {
        loadSavedCookieData();
    }, [loadSavedCookieData]);

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

        const address = `${street}, Boston, ${zip}`;

        try {
            console.log("address from addressForm.tsx:", address);
            console.log("ExpressURL being used:", ExpressURL);
            
            const response = await api.get('/api/precinct_info', {
                params: { address },
            });

            console.log("Full API response:", response);
            console.log("Response data:", response.data);
            
            const data = response.data.properties;
            console.log("Properties data:", data);

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

                console.log("Processed polling info:", pollingInfo);
                setFormError(null);
                
                startTransition(() => {
                    setPollingInformation(pollingInfo);
                });
                saveCookieData(street, zip, pollingInfo);
            } else {
                console.log("Ward or Precinct is null:", { ward: data.USER_Ward, precinct: data.USER_Precinct });
                setError('Invalid address format or unsupported location.');
            }
        } catch (err) {
            console.error("API call error:", err);
            
            // Debug the error structure
            if (axios.isAxiosError(err)) {
                console.log("Error response:", err.response);
                console.log("Error response data:", err.response?.data);
                console.log("Error status:", err.response?.status);
                console.log("Error code:", err.code);
            }
            
            // Save fallback data
            const fallbackPollingInfo: PollingInfo = {
                location: null,
                street: street,
                city: 'Boston',
                state: null,
                zip: zip,
                room: null,
                instructions: null,
                ward: null,
                precinct: null,
            };

            saveCookieData(street, zip, fallbackPollingInfo);

            // Provide specific error messages based on the error type
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 500) {
                    const errorMessage = err.response?.data?.error || 'Server error occurred';
                    console.log("Extracted error message:", errorMessage);
                    
                    if (errorMessage.includes('outside Boston city limits') || errorMessage.includes('No polling location found')) {
                        const message = 'This address appears to be outside Boston city limits. This tool only works for Boston residents. Please verify you entered a Boston address.';
                        setError(message);
                        setFormError(message);
                    } else if (errorMessage.includes('Failed to retrieve polling location')) {
                        const message = 'Unable to find polling information for this address. Please check that the address is correct and try again.';
                        setError(message);
                        setFormError(message);
                    } else {
                        const message = 'Unable to process this address. Please check the address format and try again.';
                        setError(message);
                        setFormError(message);
                    }
                } else if (err.code === 'ERR_NETWORK') {
                    const message = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
                    setError(message);
                    setFormError(message);
                } else {
                    const message = 'No polling location found for this address. Please verify the address is correct and is located within Boston city limits.';
                    setError(message);
                    setFormError(message);
                }
            } else {
                const message = 'An unexpected error occurred. Please try again.';
                setError(message);
                setFormError(message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center p-4 my-0 flex-wrap">
            <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                    <strong>Boston Residents Only:</strong> This tool only works for addresses within Boston city limits. 
                    If you live in Brookline, Cambridge, Somerville, or other surrounding cities, please use your local city&apos;s voting information resources.
                </Typography>
            </Alert>
            
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 820 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Street Address"
                            variant="outlined"
                            fullWidth
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            type="text"
                            placeholder="e.g., 700 Commonwealth Ave"
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            type="number"
                            placeholder="e.g., 02215"
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
                                        '& .MuiSvgIcon-root': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            }
                            label="Remember Address"
                        />
                    </Grid>
                </Grid>
                {formError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {formError}
                    </Alert>
                )}
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
