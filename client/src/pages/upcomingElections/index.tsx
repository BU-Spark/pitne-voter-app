import React from "react";
import Button from '@mui/material/Button';

export default function UpcomingElections() {
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4'>
                <h1 className='text-blue-700 font-bold text-8xl '>LET’S VOTE!</h1>
                <p className='p-5'>The most important information about Boston's municiple elections to help you naviagte your voting journey</p>
            </div>


            <div className='flex flex-col justify-center items-center p-4'>
                <Button variant="contained" className='p-4 m-4 rounded-2xl bg-blue-700 text-white'>Your Voter Info</Button>
                <Button variant="contained" className='p-4 m-4 rounded-2xl bg-white text-blue-700 border-blue-800 border-4 hover:bg-gray-100' >How do I register</Button>
                <p className='text-red-500'>Deadline to register: <strong>Aug 24, 2024</strong></p>
            </div>

            <div>
                <h2>Boston’s Municipal Election Dates</h2>

            </div>
        </div>
    )
}