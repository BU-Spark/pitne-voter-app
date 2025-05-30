# Debug Report: Form Submission API Issues

## Issues Identified:

### 1. Missing GEOCODE_API_KEY Environment Variable
- **Problem**: The server requires a `GEOCODE_API_KEY` to call the geocoding API (geocode.maps.co)
- **Error**: API calls fail with "Error fetching polling location"
- **Location**: `server/app/get_precinct.js` line 12

### 2. ExpressURL Configuration 
- **Current Setup**: 
  - Server runs on port 3001 (default)
  - Client expects server on port based on NEXT_PUBLIC_EXPRESS_ENV variable
  - If NEXT_PUBLIC_EXPRESS_ENV='local', uses http://localhost:3001
  - Otherwise uses deployed URL

### 3. Client Application Port
- **Current**: Application runs on port 3003
- **Expected**: Client connects to server on port 3001

## Solutions:

### Solution 1: Set up Environment Variables

Create a `.env` file in the server directory:
```bash
# server/.env
GEOCODE_API_KEY=your_api_key_here
PORT=3001
```

Create a `.env.local` file in the client directory:
```bash
# client/.env.local
NEXT_PUBLIC_EXPRESS_ENV=local
```

### Solution 2: Get Geocoding API Key
1. Visit https://geocode.maps.co/
2. Sign up for free account (5000 requests/day)
3. Get your API key
4. Add to server/.env file

### Solution 3: Verify Server is Running
```bash
cd server
npm run dev
```

### Solution 4: Test the fix
```bash
curl "http://localhost:3001/api/precinct_info?address=700%20Commonwealth%20Ave%2C%20Boston%2C%2002215"
```

## Additional Notes:
- The linter error about js-cookie types is cosmetic and doesn't affect functionality
- Server has proper CORS setup for client connections
- Error handling in addressForm.tsx provides fallback for failed API calls 