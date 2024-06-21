//URL for the local + deployed express server
export const localExpressURL = 'http://localhost:3001/';
export const deployedExpressURL = 'https://pitne-voter-app-express-production.up.railway.app/';

//URl for the local + deployed strapi server
export const localStrapiURL = 'http://localhost:1337/api/'
export const deployedStrapiURL = 'https://pitne-voter-app-production.up.railway.app/api/'

// URL for the local + deployed boston municipal election dates API
export const localBostonMunicipalAPI = localStrapiURL + 'boston-municipal-election-dates';
export const deployedBostonMunicipalAPI = deployedStrapiURL + 'boston-municipal-election-dates';

export const localCandidateAPI = localStrapiURL + 'candidates';
export const deployedCandidateAPI = deployedStrapiURL + 'candidates';