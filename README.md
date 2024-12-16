# Boston Voter App
Throughout Fall 2024, our team has been developing the Boston Voter App. It's mission is to provide a central platform for voting information and logistics, with the goal of boosting BIPOC (Black, Indigenous, People of Color) voter turnout in Boston Municipal Elections.

# Description
The Boston Voter App addresses the lack of accessible information about voting logistics and candidates in municipal elections in Boston. This progressive web application centralizes all vital voting information to increase voter turnout, particularly focusing on BIPOC voters who face significant barriers to voting in local elections. 

# Problem Statement
Many news organizations provide articles or voting guides around the election, but they are often difficult to find, last minute, and represent a narrow perspective around candidates. Additionally, most election resources are around larger races with little coverage or few resources available for local elections, where candidates have the potential to impact people’s lives more directly. BIPOC voters often have the lowest voting rates, especially in municipal elections, for a variety of reasons including lack of information and logistical barriers such as work hours and family duties. This project aims to remedy that for BIPOC voters in Boston.

# Key Features
* ### Ability to tell a user their voting location and serve a custom sample ballot for upcoming elections
    - Users can enter their home address to see their voting location and voting instructions. They also have the option to view a custom ballot for their precinct served by the Massachusetts Secretary of Commonwealth.
* ### Newsletter Sign-up feature
    - Users can enter their email address to stay up to date with important election and candidate information, a site administrator can use these email addresses in Mailchimp to send mass emails.
* ### Ability to view upcoming election deadlines
    - Users can view upcoming election dates and quickly add these dates to their Google Calendar. A site administrator can add/update these election deadlines through the Strapi CMS.
* ### Information platform for Boston Elections
    - The Boston Voter App provides a respository of information regarding candidates, voting logistics, and locations valuable to potential Boston voters.

# Solution
The Boston Voter App provides a comprehensive solution by offering:
* Centralized voting information for Boston municipal elections.
* Detailed candidate profiles, including information about them and ballot initiatives.
* Voting logistics, including polling locations and hours.
* Features to find the nearest polling booth locations.
* Information about upcoming elections.
* Tools and resources to help voters navigate logistical barriers, ultimately aiming to increase BIPOC voter turnout.

# Technical Architecture
![image](https://github.com/user-attachments/assets/5286d83c-bfa8-4890-a395-1bcc4b643128)

### Tech Stack:
* Frontend: Next.js, React, Tailwind CSS, MUI (Material-UI), Axios
* Backend: Express.js, Turf.js
* Database: Strapi Headless CMS, ArcGIS GeoJSON ward+precinct+voting location files from Boston Open Data
* Deployment: Netlify

# Getting Started:
Before Starting, ensure the following is installed:
* Node.js

# Running the Application Locally
1. Clone the repository and naviage to the git respository:
    ```bash
    git clone https://github.com/BU-Spark/pitne-voter-app.git

    cd pitne-voter-app 
    ```

2. Install dependencies:
    ```bash
    npm install
    ``` 

3. Navigate to the client directory, install dependencies, and start client:
    ```bash
    cd client
    npm install
    npm run dev
    ```

4. On another terminal, navigate to the server directory, install dependencies and start server:
    ```bash
    cd server
    npm install
    npm run dev
    ```

5. On another terminal, navigate to the Strapi directory, install dependencies and start Strapi:
    ```bash
    cd strapi 
    npm install
    npm run dev
    ```
   
## Environment Variables
Create a `.env` file in the `server` directory (`cd server`) and add the following environment variables:

```plaintext
GEOCODE_API_KEY=your_geocode_api_key_here
```
This API key is for resolving an address input by the client into latitude and longitude coordinates.

Create a `.env` file in the `client` directory (`cd client`) and add the following environment variables:

```plaintext
MAILCHIMP_AUDIENCE_ID = your_audience_id_here
MAILCHIMP_API_KEY = your_mailchimp_api_key_here
MAILCHIMP_REGION = your_mailchimp_region

NEXT_PUBLIC_EXPRESS_ENV=local
NEXT_PUBLIC_STRAPI_ENV=local
```
Note: Using the keyword local uses the local Express or Strapi server started earlier. Leaving the value blank or using any other value uses the deployment url. The local+deployed urls are specified in common/index.tsx

This API key is for enabling Mailchimp, a service that allows a site admin to collect email addresses input by site users

# Testing
Run ```npm install``` in the base directory if you haven't already.

This repository contains both unit tests with jest and end-to-end testing with playwright.

Note: If the proper .env files are not set up or have invalid credentials, many of the tests will fail.

### Jest unit tests:
Currently the client (frontend) of the site has a few jest unit tests, these can be run from the client directory with ```npm run test```
- mailchimp-ping.test.tsx: This test passes if the MAILCHIMP credentials are correct and a valid ping response is detected from Mailchimp servers

### Playwright end-to-end tests:
**Install Playwright**
```npm install -D @playwright/test
npx playwright install
```
Most of the current test coverage comes from the end-to-end tests. these can be run from the base repository directory with ```npx playwright test```
These tests will validate the functionallity of the client, server, and Strapi

    - Test1
    - Test2
    - Test3
    - Test4
    - Test5

# Directory Structure

## Root
- `.github/`
  - `workflows/`
- `client/`
  - `public/`
  - `src/`
    - `app/`
    - `common/`
    - `components/`
      - `box/`
      - `button/`
      - `nav/`
      - `subscribePopup/`
    - `pages/`
      - `api/`
      - `ballotInfo/`
        - `electionCheckBox/`
        - `whatsOnTheBallot/`
      - `candidateInfo/`
      - `dropBoxLocations/`
      - `upcomingElections/`
      - `voterInfo/`
      - `votingOptions/`
    - `styles/`
    - `theme/`
    - `utility/`
      - `BallotInfo/`
- `server/`
  - `app/`
- `strapi/`
  - `config/`
  - `database/`
    - `migrations/`
  - `public/`
    - `uploads/`
  - `src/`
    - `admin/`
    - `api/`
      - `ballot-initiative/`
        - `content-types/`
          - `ballot-initiative/`
        - `controllers/`
        - `routes/`
        - `services/`
      - `boston-municipal-election-date/`
        - `content-types/`
          - `boston-municipal-election-date/`
        - `controllers/`
        - `routes/`
        - `services/`
      - `candidate/`
        - `content-types/`
          - `candidate/`
        - `controllers/`
        - `routes/`
        - `services/`
      - `candidate-role/`
        - `content-types/`
          - `candidate-role/`
        - `controllers/`
        - `routes/`
        - `services/`
    - `extensions/`
  - `types/`
    - `generated/`
- `tests/`

<br>

* client - contains the next.js frontend, standard folder layout for next.js with app router. api folder contains serverless function for Mailchimp
* server/app - contains the express.js server and functions/files to resolve an address to a ward+precinct within Boston
* strapi - the CMS for managing content on the website, standard directory layout, refer to strapi folder documentation [here](https://docs.strapi.io/dev-docs/project-structure)
* tests - contains files for playwright end-to-end testing

# Main Pages:

### Upcoming Elections:
This is the home page of the web app and contains some react card components with static links to voter information. Closer to the bottom it contains Upcoming Election Dates that are populated through a Strapi API endpoint. These cards are generated by entries in the 'Boston Municipal Election Dates' Model. The 'Add to Google Calendar' button brings the user to a pre-filled Google Calendar page, the information filled is mostly generic but takes some information from the election name and election date. The link is located in the electionCard.tsx file within the upcomingElections directory.

### Your Voter Info:
This page has input for the users address. They also have the option to select a Remember Address checkbox. If selected, the address will be saved to a web cookie so long as the cookie consent is accepted. This address can be deleted by unchecking remember address and submitting again. The address is sent to the Geocode API which returns latitude and longitude coordinates that are then sent to turf.js. We have two files from Boston Open Data, Precinct_Boundaries_2024.json and Polling_Locations_2022.json. These files come from https://data.boston.gov/ and are located in the express server directory. These files are read by get_precinct.js to find out what ward+precinct a user resides in. This information is then used to get their polling location and the response is sent to the frontend. The response data is cached in a cookie for 1 week so long as the cookie consent is accepted.

### Voting Options:
This page contains static text information about election information and voting options.

### Candidate Info:
This page pulls candidates and candidate information from a Strapi API endpoint. Candidates are found in the Strapi Candidate model. Candidates are organized into expandable cards and displays information such as party, district, office, bio and questionnaire responses. This page also contains a popup that prompts the user to sign up for a newsletter. 

### Drop Box Locations:
This page contains static links to voting locations, as well as an iframe to an ArcGIS map containing ballot drop-off station locations. The url for the iframe is located in the index.tsx page.

### Subscribe Popup and Newsletter Form:
These are two forms, the popup appears only on the Candidate Info page while the Newsletter Form is a persistent footer on every page. Entering an email adds it to the Mailchimp audience collection through next.js serverless functions.

### common/index.tsx:
This page contains all the Strapi URL links as well as the express server link


# API's

### Geocode API:
For resolving an address to latitude and longitude coordinates, we use https://geocode.maps.co/ API service. The free plan supports 1 request per second and 5000 requests per day. This can be upgraded if needed to multiple low-cost monthly paid plans.

### Mailchimp API:
Mailchimp us used to collect emails from site users. This is to allow a site admin/owner to identify users that are interested in receiving a newsletter. To use this feature, a Mailchimp API key needs to be set up.

### Strapi CMS:
Strapi is a headless content management system. It is designed such that a site administratior can add content to Strapi which is reflected in the deployed website, this allows for modifying the website content without needing to redeploy the site. The Strapi documentation can be found [here](https://docs.strapi.io/).

# Setting Up a Mailchimp Account, API Key, and Audience ID for Website Integration

This guide provides step-by-step instructions for creating a Mailchimp account, generating an API key, and finding your Audience ID for integrating Mailchimp with the Boston Voter App.

---

### Create a Mailchimp Account

1. **Visit the Mailchimp Website**  
   Go to [Mailchimp's official website](https://mailchimp.com/).

2. **Sign Up for an Account**  
   - Click **"Sign Up Free"** in the top-right corner.
   - Enter your email address, desired username, and a secure password.
   - Click **"Sign Up"**.
   - Enter all needed information.

---

### Generate an API Key

1. **Log In to Mailchimp**  
   Visit [Mailchimp's Login Page](https://login.mailchimp.com/) and log in with your credentials.

2. **Access Account Settings**  
   - Click your profile icon in the bottom-left corner.
   - Select **"Account & Billing"**.

3. **Navigate to API Keys**  
   - Click **"Extras"** in the top navigation bar.
   - Select **"API Keys"** from the dropdown menu.

4. **Create a New API Key**  
   - Scroll down to the **Your API Keys** section.
   - Click **"Create A Key"**.
   - Mailchimp will generate a new API key. Copy this key for later use and save it to a secure location.

5. **Label the API Key (Optional)**  
   - To keep track of your keys, add a label, such as **"Website Integration"**.

---

### Find Your Audience ID

1. **Log In to Mailchimp**  
   Visit [Mailchimp's Login Page](https://login.mailchimp.com/) and log in with your credentials.

2. **Navigate to Audience Settings**  
   - Click on the **"Audience"** tab in the top menu.
   - Create an Audience group if prompted to do so.

3. **Access Audience Settings**  
   - Click **"Manage Audience"** in the top-right corner.
   - Select **"Settings"** from the dropdown menu.

4. **Find the Audience ID**  
   - Scroll down to the **Audience ID** section.
   - Copy the Audience ID for use in your application and save it to a secure location.

---

### Add the API Key and Audience ID to Your Website

1. **Create or locate the .env File**  
   - Create or locate the .env file as instructed in the README.md

2. **Add the API Key and Audience ID**  
   Add your API key and Audience ID to the .env file
   ```plaintext
   MAILCHIMP_API_KEY=your-api-key-here
   MAILCHIMP_AUDIENCE_ID=your-audience-id-here


# Known Bugs and Issues
* Candidate Information page candidate card will not drop down when clicked
* Mobile view is subpar on many pages but particularly broken on the Candidate Information page
* upcomingElections page cards are off-center and improperly sized
* Website is slow (probably due to large .png files and slow Strapi server)

***SEO Optimizations + Accessibility Issues***
* Links should be hypnenated instead of camel case
* Images should be vector files instead of .png files
* Needs a meta-title and meta-description
* Images need alt tags (accessibility)
* Too many ```<h1>``` tags
* Thin content (not enough words)
* Specify html language
* Needs a Robots.txt file

# Future Work
* Fix bugs/issues above
* Modify the candidate model to relate to candidate questionnaires, enabling automated survey responses for candidates
* Fix/complete the candidate information page, currently missing correct filter implementation
* Add logic to the newsletter sign-up popup so it does not show up again if a user enters their email address
* Add prettier error messages for invalid email/already on mailing list
* Move ArcGIS GeoJSON files into Strapi and do processing in next.js serverless function folder instead of express server.
* Add more unit tests for site functionallity

# SE Team (Fall 2024)
* Remus Harris - Github: @remus287 - email: remus@bu.edu
* Celine Boudaie - Github: @celineboudaie
* Tiffany Yu
* Grace Murphy

# Team (Spring 2024)
* Arshnoor Kaur Chadha - Github: @arshnoorKC13
* Elenaor Elkus - Github: @eelkus01
* Jason Jiang - Github: @jasonjiang9142

# Deployment
Access our deployed website [here](https://bostonvoter.com/) or https://bostonvoter.com/.
  
# Snapshots

**Ability to see Upcoming Elections from Strapi CMS input**

<img width="1268" alt="image" src="https://github.com/user-attachments/assets/28769051-0f02-4511-a07a-d69e8c125a0a">

<!--- <img width="1440" alt="Screenshot 2024-06-28 at 12 12 58 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/95c25d88-d41a-4964-975a-efd1a68adaa4"> -->

**Comprehensive List of all possible Voting Options**, including direct links from government websites

<img width="1440" alt="Screenshot 2024-06-28 at 12 14 22 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/82d8f3ff-138e-4063-91b1-08c5ae4bd76d">

**Ability to see a custom preview voting ballot and voting location based on entered address**

<img width="1268" alt="image" src="https://github.com/user-attachments/assets/b52bd812-390f-49f0-a707-f3813088ae98">

<img width="1267" alt="image" src="https://github.com/user-attachments/assets/28557ecb-0134-4a6f-869b-ddc7f337c5c7">

<!--- **Ability to see information about candidates for a selected election and district number**

<img width="1440" alt="Screenshot 2024-06-28 at 12 15 53 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/14e4c319-a8d7-4b38-bc06-2ee1644e0e44">

<img width="1440" alt="Screenshot 2024-06-28 at 12 16 07 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/11e78484-7ec8-40c2-a44d-45799712b9ed">

<img width="1440" alt="Screenshot 2024-06-28 at 12 16 31 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/56e64008-8bcc-40b5-8cbd-ae4ba9896f7b"> -->

**Ability to information for all polling locations in Boston and nearest ones for a given address**

<img width="1440" alt="Screenshot 2024-06-28 at 12 17 49 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/70f92823-08cc-4a2b-a539-2fb253b3be82">

<img width="1440" alt="Screenshot 2024-06-28 at 12 19 35 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/6f1b3dc5-fb7e-44e7-a357-74d6e084fcc3">
