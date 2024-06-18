import React from "react";
import ElectionDates from './electionDates'
import ButtonFill from "@/components/button/ButtonFill";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DeadlineToRegister from "./deadlineToRegister";
import NavBar from "@/components/nav/NavBar";



export default function UpcomingElections() {

    return (
        <div className=''>
            <NavBar />
            <div className='flex flex-wrap justify-center items-center p-4 text-center my-4'>
                <h1 className='text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>LET&#39;S VOTE! </h1>
                <img src='/StarColor.png' alt='Star' className='ml-4 w-10 h-10' />
                <p className='font-semibold text-xl p-5'>The most important information about Boston&#39;s municipal elections to help you navigate your voting journey</p>
            </div>


            <div className='flex flex-col justify-center items-center p-4' >
                <ButtonFill name='Your Voter Info' link='/voterInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFillEx name='-> How do I register' link='https://www.boston.gov/departments/elections/how-register-vote' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
                <DeadlineToRegister />
            </div>

            <h1 className="text-center font-semibold text-3xl m-10">Boston&#39;s Upcoming Election Dates</h1>

            <div className="flex items-center justify-center flex-wrap">
                <ElectionDates />
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-10'>
                <p className=' font-semibold p-4'>You may be wondering.....</p>
                <ButtonFill name='What&#39;s on the Ballot' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFill name='What are my voting options' link='/votingOptions' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
            </div>
        </div>
    )
}