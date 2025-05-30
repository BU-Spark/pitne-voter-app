// Debug script to test the API endpoint
import axios from 'axios';

const testAPI = async () => {
    try {
        console.log('Testing API endpoint...');
        
        // Test 1: Check if server responds
        const response1 = await axios.get('http://localhost:3001/');
        console.log('Server root response:', response1.data);
        
        // Test 2: Check environment variables
        console.log('NEXT_PUBLIC_EXPRESS_ENV:', process.env.NEXT_PUBLIC_EXPRESS_ENV);
        
        // Test 3: Try the precinct API with detailed error handling
        try {
            const response2 = await axios.get('http://localhost:3001/api/precinct_info', {
                params: { address: '700 Commonwealth Ave, Boston, 02215' }
            });
            console.log('API Success:', response2.data);
        } catch (error) {
            console.log('API Error Details:');
            console.log('Status:', error.response?.status);
            console.log('Data:', error.response?.data);
            console.log('Full error:', error.message);
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
};

testAPI(); 