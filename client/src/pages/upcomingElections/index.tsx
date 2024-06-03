
import React from "react";
import ElectionDates from './electionDates'
import ButtonFill from "@/components/button/ButtonFill";


export default function UpcomingElections() {

    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center p-4 text-center'>
                <h1 className='text-blue-700 font-bold text-7xl '>LET&#39;S VOTE!</h1>
                <p className='p-5 text-xl'>The most important information about Boston&#39;s municipal elections to help you navigate your voting journey</p>
            </div>


            <div className='flex flex-col justify-center items-center p-4'>
                <ButtonFill name='Your Voter Info' link='/voterInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFill name='How do I register' link='https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
                <p className='text-red-500'>Deadline to register: <strong>Aug 24, 2024</strong></p>
            </div>

            <h1 className="text-center font-semibold text-3xl m-10">Boston&#39;s Municipal Election Dates</h1>

            <div className="flex items-center justify-center flex-wrap">
                <ElectionDates />
                <ElectionDates />
                <ElectionDates />
                <ElectionDates />
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-10'>
                <p className=' font-semibold p-4'>You may be wondering.....</p>
                <ButtonFill name='What&#39;s on the Ballot' link='/ballotInfo' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
                <ButtonFill name='What are my voting options' link='/earlyVoting' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
            </div>




        </div>
    )
}