// URL for the local + deployed express server
export const localExpressURL = 'http://localhost:3001/';
export const deployedExpressURL = 'https://pitne-voter-app-express-production.up.railway.app/';


// URl for the local + deployed strapi server
export const localStrapiURL = 'http://localhost:1337/api/'
export const deployedStrapiURL = 'https://pitne-voter-app-production.up.railway.app/api/'


// URL for the local + deployed boston municipal election dates API
export const localBostonMunicipalAPI = localStrapiURL + 'boston-municipal-election-dates';
export const deployedBostonMunicipalAPI = deployedStrapiURL + 'boston-municipal-election-dates';


//URl for the local + deployed candidate API
export const localCandidateAPI = localStrapiURL + 'candidates';
export const deployedCandidateAPI = deployedStrapiURL + 'candidates';

export const localCandidateRoleAPI = localStrapiURL + 'candidate-roles';
export const deployedCandidateRoleAPI = deployedStrapiURL + 'candidate-roles';


// Global variables and their setting functions for district number and selected election
export let globalDistrictNum: string | null = null;

export const setGlobalDistrictNum = (num: string | null) => {
    globalDistrictNum = "District " + num;
};
export let globalCurrElection: string | null = null;

export const setGlobalCurrElection = (name: string | null) => {
    globalCurrElection = name;
};