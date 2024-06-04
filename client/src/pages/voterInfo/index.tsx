import React from 'react';
import Button from '@mui/material/Button';
import '@/app/globals.css'
import ButtonFill from '@/components/button/ButtonFill';
import { useRouter } from 'next/router';

export default function VoterInfo() {



    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='text-blue-700 font-bold text-6xl '>Your Voter Info</h1>
                <h1 className='font-semibold text-xl p-5 mt-2'>Here is everything you need to know about your <br />voter status and personal voting logistics!</h1>
                <p className=''>Can&#39;t vote in person or want to vote early?</p>
                <ButtonFill name='Early Voting Options' link='/votingOptions' className='p-4 mt-4 rounded-full bg-blue-700 text-white border-blue-800 ' />
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <h1 className='font-semibold text-center my-4'  >Basic Voter Info</h1>
                <p className='p-4 bg-blue-100 rounded-full w-1/2 text-center'><strong> County: </strong>Suffolk</p>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <h1 className='font-semibold text-left mb-2' >Polling Location</h1>
                <p className='my-2 text-center md:w-1/2 lg:w-1/2 italic'>Reminder: You can vote at any polling location during the early voting period, but you <strong>MUST</strong> vote at the location below during election day.</p>
                <p className='p-4 bg-blue-100 rounded-full md:w-1/2 lg:w-1/2 w-2/3 text-center' > Eastover Elementary School<br /> 500 Cherokee Rd<br /> Boston, MA, 02215<br /></p>
            </div>

            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-l'>Now that you know where you can vote, let&#39;s explore exactly who and what you are voting for.</h1>
                <ButtonFill name='Ballot Info' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
            </div>
        </div>

    )
}