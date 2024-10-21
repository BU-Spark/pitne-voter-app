import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material';
import { deployedExpressURL } from '@/common';

const AddressForm: React.FC = () => {
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetSuffix, setStreetSuffix] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [pollingLocation, setPollingLocation] = useState<string | null>(null);
    const [htmlContent, setHtmlContent] = useState<string | null>(null); // <-- HTML state
    const [error, setError] = useState<string | null>(null);

    const streetSuffixOptions = [
        'ARTERY', 'AVE', 'BLVD', 'CIR', 'CT', 'DR', 'FRWY', 'HWY',
        'LN', 'PARK', 'PKWY', 'PIKE', 'PL', 'RD', 'ST', 'SQ', 'TER', 'TRL', 'WAY'
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPollingLocation(null);
        setHtmlContent(null); // Reset previous content
        setError(null);

        const address = `${streetNumber}, ${streetName}, ${streetSuffix}, ${zip || city}`;
        console.log("address = ", address);
        // setPollingLocation(address);



        const data = new URLSearchParams({
            "St_no_high": streetNumber,
            "St_nm": streetName,
            "StSuffix": streetSuffix,
            "Ct_twn_cd": "35", // city code, adjust as needed
            "Ct_twn_nm": city,
            "Zip": zip,
            "hidReset": "0"
        });

        try {
            const response = await fetch('/api/get_request', {
                method: 'GET',
            });

            if (response.ok) {
                const rawHtml = await response.text(); // Get raw HTML
                setHtmlContent(rawHtml); // Store the HTML in the state
                setPollingLocation(address); // Update polling location here after success
            } else {
                console.error('Error with status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-horizontal" id="MainForm" method="post">

                {/* Address Fields */}
                <div className="row Div">
                    <h3>* Required: Enter your street address in 3 separate boxes</h3>
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor="txtStreetNo">1. Your street number:</label>
                        <TextField
                            id="txtStreetNo"
                            value={streetNumber}
                            onChange={(e) => setStreetNumber(e.target.value)}
                            inputProps={{ maxLength: 6 }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor="txtStreetName">2. Your street name:</label>
                        <TextField
                            id="txtStreetName"
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor="ddlStreetSuffix">3. Select street suffix:</label>
                        <Select
                            id="ddlStreetSuffix"
                            value={streetSuffix}
                            onChange={(e) => setStreetSuffix(e.target.value as string)}
                            fullWidth
                        >
                            {streetSuffixOptions.map((suffix) => (
                                <MenuItem key={suffix} value={suffix}>
                                    {suffix}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    {/* City or Zip */}
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="ddlCityTown">Your city or town:</label>
                        <TextField
                            id="ddlCityTown"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="txtZip">Zip code:</label>
                        <TextField
                            id="txtZip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            inputProps={{ maxLength: 5 }}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {/* Submit and Reset */}
                <div className="flex justify-center">
                    <Button type="submit" variant="outlined" className='p-3 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-blue-100'>
                        Submit Address
                    </Button>
                </div>

                {/* Polling Location or Error */}
                {pollingLocation && <Typography variant="h6">Polling Location: {pollingLocation}</Typography>}
                {error && <Typography variant="h6" color="error">{error}</Typography>}
            </form>

            {/* Display raw HTML content */}
            {htmlContent && (
                <div className="mt-6">
                    <Typography variant="h6">Polling Information:</Typography>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            )}

            {/* Display error message */}
            {error && <Typography variant="h6" color="error">{error}</Typography>}
        </div>
    );
};

export default AddressForm;