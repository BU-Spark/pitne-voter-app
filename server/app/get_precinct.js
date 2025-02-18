import * as turf from '@turf/turf';
// import Precincts from './app/Precinct_Boundaries_2024.json' assert { type: 'json' };
import fs from 'fs';
const Precincts = JSON.parse(fs.readFileSync('./app/Precinct_Boundaries_2024.json', 'utf8'));
// import PollingLocations from './app/Polling_Locations_2022.json' assert { type: 'json' };
const PollingLocations = JSON.parse(fs.readFileSync('./app/Polling_Locations_2022.json', 'utf8'));

const getPrecinct = async (address) => {    
    console.log("address from get_precinct.js:", address);
    try {
        // Fetch coordinates for the address using the API key from the .env file
        const apiKey = process.env.GEOCODE_API_KEY; // Access environment variable directly

        // Split the address string by commas and trim whitespace
        const [streetPart, cityPart, zipPart] = address.address.split(',').map(part => part.trim());

        // Extract street number and name from the street part
        const streetNumber = streetPart?.split(' ')[0] || "UnknownNumber";
        const streetName = streetPart?.split(' ').slice(1).join('+') || "UnknownStreet";
        const city = cityPart || "Boston"; // Default to Boston if city is missing
        const state = "MA"; // Assuming it's always in Massachusetts
        const zip = zipPart || "UnknownZip"; // Provide a default zip if missing
        const country = "US";

        // Construct the API URL with parsed address components
        const response = await fetch(`https://geocode.maps.co/search?street=${streetNumber}+${streetName}&city=${city}&state=${state}&postalcode=${zip}&country=${country}&api_key=${apiKey}`);
        const data = await response.json();

        // Create a point using the coordinates
        const point = turf.point([data[0].lon, data[0].lat]);

        // Find the precinct that contains the user's coordinates
        let user_precinct, user_ward;
        for (const feature of Precincts.features) {
            if (turf.booleanPointInPolygon(point, feature.geometry)) {
                user_precinct = parseInt(feature.properties.Precinct1, 10);
                user_ward = parseInt(feature.properties.Ward1, 10);
                break;
            }
        }

        // Find the polling location that matches the user's precinct and ward
        let user_polling_location;
        for (const location of PollingLocations.features) {
            if (
                parseInt(location.properties.USER_Ward, 10) === user_ward &&
                parseInt(location.properties.USER_Precinct, 10) === user_precinct
            ) {
                user_polling_location = location;
                break;
            }
        }

        // console.log(point);
        // console.log('User Precinct: ', user_precinct);
        // console.log('User Ward: ', user_ward);
        // console.log('User Polling Location: ', user_polling_location);
        
        return user_polling_location;
    } catch (error) {
        console.error('Error fetching precinct data:', error);
        throw new Error('Failed to retrieve polling location');
    }
};

export default getPrecinct;