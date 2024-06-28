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

3. Navigate to the client directory, install dependencies, and start client server
    ```bash
    cd client
    npm install
    npm run dev
    ```

4. On another terminal, navigate to the server directory and install dependencies:
    ```bash
    cd server
    npm install
    ```

5. On another terminal, navigate to the Strapi directory and install dependencies:
    ```bash
    cd strapi 
    npm install
    
    ```



## Environment Variables
Create a `.env` file in the `server` directory (`cd server`) and add the following environment variables:

```plaintext
GOOGLE_CIVIC_API_KEY=your_api_key_here
```


# Deployment 
Access our deployed website https://bostonvoter.com/
[![Watch the video](https://img.youtube.com/vi/AIte6hS3cCc/0.jpg)](https://www.youtube.com/watch?v=AIte6hS3cCc&feature=youtu.be)


# Collaborators 
* Arshnoor Kaur Chadha - Github: @arshnoorKC13
* Elenaor Elkus - Github: @eelkus01
* Jason Jiang - Github: @jasonjiang9142

  
# SnapShots

**Ability to see Upcoming Elections from Strapi CMS input**

<img width="1440" alt="Screenshot 2024-06-28 at 12 12 58 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/95c25d88-d41a-4964-975a-efd1a68adaa4">

**Comprehensive List of all possible Voting Options**, including direct links from government websites

<img width="1440" alt="Screenshot 2024-06-28 at 12 14 22 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/82d8f3ff-138e-4063-91b1-08c5ae4bd76d">

**Ability to see information about candidates for a selected election and district number**

<img width="1440" alt="Screenshot 2024-06-28 at 12 15 53 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/14e4c319-a8d7-4b38-bc06-2ee1644e0e44">

<img width="1440" alt="Screenshot 2024-06-28 at 12 16 07 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/11e78484-7ec8-40c2-a44d-45799712b9ed">

<img width="1440" alt="Screenshot 2024-06-28 at 12 16 31 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/56e64008-8bcc-40b5-8cbd-ae4ba9896f7b">

**Ability to information for all polling locations in Boston and nearest ones for a given address**

<img width="1440" alt="Screenshot 2024-06-28 at 12 17 49 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/70f92823-08cc-4a2b-a539-2fb253b3be82">

<img width="1440" alt="Screenshot 2024-06-28 at 12 19 35 PM" src="https://github.com/BU-Spark/pitne-voter-app/assets/69778744/6f1b3dc5-fb7e-44e7-a357-74d6e084fcc3">
