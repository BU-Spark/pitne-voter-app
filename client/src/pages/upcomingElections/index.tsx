import React from "react";
import ElectionDates from './electionDates'
import ButtonFill from "@/components/button/ButtonFill";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DeadlineToRegister from "./deadlineToRegister";
import NavBar from "@/components/nav/NavBar";
import { Box } from "@mui/material";
import { Container, Grid } from '@mui/material';
import CustomCard from '@/components/button/CustomCard';



export default function UpcomingElections() {

    return (
        <div>

            {/* Header */}
            <div className='flex flex-col items-left p-20 pt-40 text-left <div bg-sky-50'>
  <div className='flex flex-col sm:flex-row items-center justify-between'>
    <div>
      <h1 className='text-blue-700 font-bold lg:text-7xl text-5xl bg-blue-700 bg-clip-text text-transparent'> LET&#39;S VOTE! </h1>
      <p className='font-semibold text-2xl pt-8 text-blue-950'>The most important information about Boston&#39;s municipal elections <br/> to help you navigate your voting journey.</p>
    </div>
    <div className="mr-20">
      <img src="main.png" alt="main" style={{ width: '400px' }} />


    </div>
  </div>
</div>

            {/* Cards */}
<div className='flex flex-col lg:flex-row justify-center items-center m-10 p-4 mt-20 '>
        <CustomCard
            image="frame2.png"
            disableTitle={true}     
            description="Everything you need to know about your voter status and personal voting logistics for local, state, and  primary elections."
            className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200'
            buttonText="Your Voter Info"
            buttonLink="/voterInfo" />
     
    <div className="m-10"></div>

        <CustomCard
            image="frame1.png"
            disableTitle={true}     
            description="Unsure if you're registered to vote? Ensure you're ready for the upcoming election season."
            className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200'
            buttonText="How to Register"
            buttonLink="https://www.boston.gov/departments/elections/how-register-vote" />
    
    <div className="m-10"></div>
    
     
            <CustomCard
              image="frame3.png"
              disableTitle={true}
              description="Can&#39;t vote in person or want to vote early?"
              className="p-4 m-4  rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200"
              buttonText="Early Voting Options"
              buttonLink="/votingOptions"
            />
          </div>

    <div className='flex flex-col md:flex-row justify-center items-center p-4 '>
            <DeadlineToRegister />
            </div>
            


            {/* Election Dates */}
            <div className="bg-sky-100 p-4 mt-20 ">
            <h1 className="text-left font-semibold text-3xl m-20">Boston&#39;s Upcoming Election Dates</h1>
            
            <div className="flex items-center justify-center flex-wrap">
                <ElectionDates />
            </div>
            </div>


            {/* Footer */}
            <div className='flex flex-col justify-center items-center p-4 text-center  bg-sky-100'>
                <h1 className='font-semibold text-lg mt-16 m-4'>You may be wondering...</h1>
                <ButtonFill name='What&#39;s on the Ballot' link='/voterInfo' className='p-4 m-4 rounded-full text-white-700 bg-blue-700 hover:bg-blue-800' />
                <ButtonFill name='What are my voting options' link='/votingOptions' className='p-4 m-4 rounded-full text-white-700 bg-blue-700 hover:bg-blue-800' />
            </div>
        </div>
    )
}