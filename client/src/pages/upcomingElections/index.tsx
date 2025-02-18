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
       {/* Rectangle with absolute positioning */}
       <div
          style={{
            width: '600px',
            height: '226px',
            position: 'absolute',
            top: '240px',
            backgroundColor: '#1D4ED8',
            left: '0',
            
          }}
        />
      <h1><img src="/Headline.svg" alt="LetsVoteIcon" style={{ zIndex: 50, position: 'relative' }}/></h1>
     
      <p className='font-semibold text-2xl pt-8 text-blue-950'>Empower your voice and shape your city through streamlining your voting process.</p>
      <div style={{width: 263, height: 60, paddingTop: 20, paddingBottom: 20, background: '#D31F37', borderRadius: 100, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex', marginTop: 20}}>
        <div style={{alignSelf: 'stretch', height: 40, paddingTop: 30, paddingBottom: 30, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div style={{textAlign: 'center', color: '#ECF4F8', fontFamily: 'Roboto', fontSize: 20, fontWeight: '500', lineHeight: 20, letterSpacing: 0.10, wordWrap: 'break-word'}}>UPCOMING ELECTIONS</div>
        </div>
      </div>
    </div>
    <div className="mr-20">
      <img src="/OldStateHouse.svg" alt="StatehouseLogo"/>
    </div>
  </div>
</div>

<div
  style={{
    width: '92%', // Leave gaps on side
    background: '#172554', // Background color
    padding: '20px', // Padding for top and bottom
    display: 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    gap: '10px', // Space between text and icon
    fontFamily: 'Inter',
    margin: '20px auto 0' // Add space above the rectangle
  }}
>
  {/* Text */}
  <div
    style={{
      color: '#ECF4F8',
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '20px',
      letterSpacing: '10px',
      textAlign: 'center',
    }}
  >
    Find Out More
  </div>

  {/* Icon */}
  <div data-svg-wrapper>
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 0.5L8.5 12.67L2.91 7.08L1.5 8.5L9.5 16.5L17.5 8.5L16.09 7.09L10.5 12.67L10.5 0.5L8.5 0.5Z"
        fill="#ECF4F8"
        stroke="#ECF4F8"
      />
    </svg>
  </div>
</div>
<div className='flex flex-col lg:flex-row justify-center items-center m-10 p-4 mt-20'>
  {/* Early Voting Options Card */}
  <div className="flex flex-col items-center p-4 m-4">
    <img src="frame3.png" alt="Early Voting" className="w-flex h-20 mb-4" /> {/* Image added here */}
    <div className="h-10 px-[15px] py-2.5 rounded-[20px] border border-blue-950 justify-center items-center gap-2.5 inline-flex">
      <div className="text-center text-blue-700 text-xl font-medium font-['Roboto'] leading-tight">
        <a href="/votingOptions">Early Voting Options</a>
      </div>
    </div>
    <div className="text-center text-blue-950 text-base font-medium font-['Inter'] leading-tight mt-2.5">
      Can’t vote in person or want to vote early?
    </div>
  </div>

  <div className="m-10"></div>

  {/* How to Register Card */}
  <div className="flex flex-col items-center p-4 m-4">
    <img src="/HowToRegisterIcon.svg" alt="How to Register" className="w-flex h-20 mb-4" /> {/* Image added here */}
    <div className="h-10 px-[15px] py-2.5 rounded-[20px] border border-blue-950 justify-center items-center gap-2.5 inline-flex">
      <div className="text-center text-blue-700 text-xl font-medium font-['Roboto'] leading-tight">
        <a href="https://www.boston.gov/departments/elections/how-register-vote">How to Register</a>
      </div>
    </div>
    <div className="text-center text-blue-950 text-base font-medium font-['Inter'] leading-tight mt-2.5">
      Unsure if you are registered to vote?
    </div>
  </div>

  <div className="m-10"></div>

  {/* Your Voter Info Card */}
  <div className="flex flex-col items-center p-4 m-4">
    <img src="frame2.png" alt="Your Voter Info" className="w-flex h-20 mb-4" /> {/* Image added here */}
    <div className="h-10 px-[15px] py-2.5 rounded-[20px] border border-blue-950 justify-center items-center gap-2.5 inline-flex">
      <div className="text-center text-blue-700 text-xl font-medium font-['Roboto'] leading-tight">
        <a href="/voterInfo">Your Voter Info</a>
      </div>
    </div>
    <div className="text-center text-blue-950 text-base font-medium font-['Inter'] leading-tight mt-2.5">
      Everything you need to navigate.
    </div>
  </div>
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