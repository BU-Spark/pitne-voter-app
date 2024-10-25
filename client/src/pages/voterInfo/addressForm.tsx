import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material';
import { localExpressURL } from '@/common';
import { Score } from '@mui/icons-material';

const AddressForm: React.FC = () => {
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetSuffix, setStreetSuffix] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    interface PollingLocation {
        USER_Ward: string;
        USER_Precinct: string;
        USER_Location2: string;
        Match_addr: string;
        USER_Voting_Roo: string;
    }

    const [pollingLocation, setPollingLocation] = useState<PollingLocation | null>(null);
    const [htmlContent, setHtmlContent] = useState<string | null>(null); // <-- HTML state
    const [error, setError] = useState<string | null>(null);

    const streetSuffixOptions = [
        'ARTERY', 'AVE', 'BLVD', 'CIR', 'CT', 'DR', 'FRWY', 'HWY',
        'LN', 'PARK', 'PKWY', 'PIKE', 'PL', 'RD', 'ST', 'SQ', 'TER', 'TRL', 'WAY'
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPollingLocation(null)
        setHtmlContent(null); // Reset previous content
        setError(null);

        try {
            // CHANGE TO DEPLOYED URL BEFORE DEPLOYING
            const response = await fetch(localExpressURL + 'api/precinct_info', {
                method: 'POST',
                body: JSON.stringify({
                    number: streetNumber,
                    street: streetName,
                    suffix: streetSuffix,
                    city: city,
                    zip: zip
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setPollingLocation(data.properties);


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
                {pollingLocation &&
                    <div>
                        <Typography variant="h6">Voting Information</Typography>
                        <ul>
                            <li><strong>Ward: </strong>{pollingLocation.USER_Ward}</li>
                            <li><strong>Precinct: </strong>{pollingLocation.USER_Precinct}</li>
                            <li><strong>Polling Location: </strong>{pollingLocation.USER_Location2}</li>
                            <li><strong>Address: </strong>{pollingLocation.Match_addr}</li>
                            <li><strong>Instructions: </strong>{pollingLocation.USER_Voting_Roo}</li>
                            <li>
                                <iframe
                                    // src={`https://www.sec.state.ma.us/WhereDoIVoteMA/ShowBallot/ViewMyBallot/BallotOut/ST/35/${pollingLocation.USER_Ward}/${pollingLocation.USER_Precinct}`}
                                    src={`http://localhost:8000/test.html`}
                                    width="900"
                                    height="600"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </li>
                        </ul>
                    </div>

                }
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
