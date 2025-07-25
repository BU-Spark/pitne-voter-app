import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address } = req.body;
    
    // Validate required fields
    if (!address || !address.streetNumber || !address.streetName || !address.cityName || !address.zipCode) {
      return res.status(400).json({ error: 'Missing required address fields' });
    }

    // Create form data for the external API
    const formData = new URLSearchParams();
    formData.append('St_no_high', address.streetNumber);
    formData.append('St_nm', address.streetName);
    formData.append('StSuffix', address.streetSuffix || '');
    formData.append('Ct_twn_cd', address.cityCode || '');
    formData.append('Ct_twn_nm', address.cityName);
    formData.append('Zip', address.zipCode);
    formData.append('hidReset', '0');

    // Make the request to the external API
    const response = await axios.post(
      'https://www.sec.state.ma.us/WhereDoIVoteMA/WhereDoIVote/',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Origin': 'https://www.sec.state.ma.us',
          'Referer': 'https://www.sec.state.ma.us/WhereDoIVoteMA/WhereDoIVote/',
        },
      }
    );

    // Return the response data
    return res.status(200).json({ 
      success: true,
      data: response.data 
    });
  } catch (error) {
    console.error('Error in voter lookup proxy:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch voter information',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 