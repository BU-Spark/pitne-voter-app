# TEMPLATE-base-repo

# Boston Voter App
Collaborators: 
* Arshnoor Kaur Chadha; Github: @arshnoorKC13
* Eleanor Elkus; Github: @eelkus01
* Jason Jiang; Github: @jasonjiang9142

# Description
The Boston Voter App addresses the lack of accessible information about voting logistics and candidates in municipal elections in Boston. This progressive web application centralizes all vital voting information to increase voter turnout, particularly focusing on BIPOC voters who face significant barriers to voting in local elections. 

# Problem Statement
Many news organizations provide articles or voting guides around the election, but they are often difficult to find, last minute, and represent a narrow perspective around candidates. Additionally, most election resources are around larger races with little coverage or few resources available for local elections, where candidates have the potential to impact people’s lives more directly. BIPOC voters often have the lowest voting rates, especially in municipal elections, for a variety of reasons including lack of information and logistical barriers such as work hours and family duties. This project aims to remedy that for BIPOC voters in Boston.

# Solution
The Boston Voter App provides a comprehensive solution by offering:
* Centralized voting information for Boston municipal elections.
* Detailed candidate profiles, including information about them and ballot initiatives.
* Voting logistics, including polling locations and hours.
* Features to find the nearest polling booth locations.
* Information about upcoming elections.
* Tools and resources to help voters navigate logistical barriers, ultimately aiming to increase BIPOC voter turnout.

# Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/BU-Spark/pitne-voter-app.git
    cd pitne-voter-app 
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Navigate to the client directory, install dependencies, and run client :
    ```bash
    cd client
    npm install
    npm run dev
    ```

4. On a new terminal, navigate to the server directory, install dependencies, and run server:
    ```bash
    cd server
    npm install
    npm run dev
    ```

5. On a new terminal, navigate to the Strapi directory, install dependencies, and run Strapi:
    ```bash
    cd strapi 
    npm install
    npm start
    ```

## Environment Variables
Create a `.env` file in the `server` directory (`cd server`) and add the following environment variables:

``` bash
GOOGLE_CIVIC_API_KEY=your_api_key_here
```


# Deployment 
Access our deployed website through netlify at https://pitne-voter.netlify.app.

Status of Deployment: 
[![Netlify Status](https://api.netlify.com/api/v1/badges/2475ff74-781c-4ac2-b8c6-3966fa276ea6/deploy-status)](https://app.netlify.com/sites/pitne-voter/deploys)

# Collaborators 
* Arshnoor Kaur Chadha; Github: @arshnoorKC13
* Elenaor Elkus; Github: @eelkus01
* Jason Jiang; Github: @jasonjiang9142


