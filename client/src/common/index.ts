// URL for the local + deployed express server
export const localExpressURL = 'http://localhost:3001/';
export const deployedExpressURL = 'https://pitne-voter-app-express-production.up.railway.app/';
export const ExpressURL = process.env.NEXT_PUBLIC_EXPRESS_ENV === 'local' ? localExpressURL : deployedExpressURL;

// Make sure the env variables are loaded. Prints at compile time
console.log('Environment Variable EXPRESS_ENV:', process.env.NEXT_PUBLIC_EXPRESS_ENV);
console.log('ExpressURL:', ExpressURL);



// URl for the local + deployed strapi server
export const localStrapiURL = 'http://localhost:1337/api/'
export const deployedStrapiURL = 'https://pitne-voter-app-production.up.railway.app/api/'
export const StrapiURL = process.env.NEXT_PUBLIC_STRAPI_ENV === 'local' ? localStrapiURL : deployedStrapiURL;

// Make sure the env variables are loaded. Prints at compile time
console.log('Environment Variable STRAPI_ENV:', process.env.NEXT_PUBLIC_STRAPI_ENV);
console.log('StrapiURL:', StrapiURL);


// URL for the boston municipal election dates API
export const BostonMunicipalAPI = StrapiURL + 'boston-municipal-election-dates';

//URl for the candidate API
export const CandidateAPI = StrapiURL + 'candidates';

// URL for the candidate role API
export const CandidateRoleAPI = StrapiURL + 'candidate-roles';

export const BallotInitiativeAPI = StrapiURL + 'ballot-initiatives';




// Global variables and their setting functions for district number and selected election
export let globalDistrictNum: string | null = null;

export const setGlobalDistrictNum = (num: string | null) => {
    globalDistrictNum = "District " + num;
};
export let globalCurrElection: string | null = null;

export const setGlobalCurrElection = (name: string | null) => {
    globalCurrElection = name;
};