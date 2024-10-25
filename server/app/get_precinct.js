import * as turf from '@turf/turf';
import Precincts from './Precinct_Boundaries_2024.json' assert { type: 'json' };
import PollingLocations from './Polling_Locations_2022.json' assert { type: 'json' };

const getPrecinct = async (address) => {    
    try {
        // Fetch coordinates for the address using the API key from the .env file
        const apiKey = process.env.GEOCODE_API_KEY; // Access environment variable directly

        const response = await fetch(`https://geocode.maps.co/search?street=${address.number}+${address.street.replace(/\s/g, '+')}+${address.suffix}&city=Boston&state=MA&postalcode=${address.zip}&country=US&api_key=${apiKey}`);
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

        console.log(point);
        console.log('User Precinct: ', user_precinct);
        console.log('User Ward: ', user_ward);
        console.log('User Polling Location: ', user_polling_location);
        
        return user_polling_location;
    } catch (error) {
        console.error('Error fetching precinct data:', error);
        throw new Error('Failed to retrieve polling location');
    }
};

export default getPrecinct;