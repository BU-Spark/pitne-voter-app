// /pages/api/get_request.js

export default async function handler(req, res) {
    try {
      const response = await fetch('https://www.sec.state.ma.us/WhereDoIVoteMA/ShowBallot/ViewMyBallot/BallotOut/ST/35/18/11', {
        method: 'GET',
      });
  
      if (response.ok) {
        const rawHtml = await response.text(); // Get the raw HTML
        res.status(200).send(rawHtml); // Send the HTML back to the client
      } else {
        console.error('Error with status:', response.status);
        res.status(response.status).json({ error: 'Failed to fetch the ballot information' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }