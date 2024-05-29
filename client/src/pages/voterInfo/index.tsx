import React from 'react';
import Button from '@mui/material/Button';

export default function VoterInfo() {
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='font-semibold text-2xl'>Here is everything you need to know about your <br />voter status and personal voting logistics!</h1>
                <p className='mt-8 mb-4'>Can’t vote in person or want to vote early?</p>
                <Button variant="contained" className='p-4 m-4 rounded-full bg-blue-700 text-white'>Early Voting Options</Button>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-4'>
                <h1 className='text-left'>Basic Voter Info</h1>
                <p className='p-4 bg-blue-200 rounded-full w-1/2'>County: <strong>Suffolk</strong></p>
            </div>
        </div>

    )
}