'use client';
import React from "react";
import Button from '@mui/material/Button';
import ElectionDates from './electionDates'
import { useRouter } from 'next/navigation';
import ButtonFill from "@/components/button/ButtonFill";


export default function UpcomingElections() {
    const router = useRouter();

    const handleClick = (page: string) => {
        router.push(page);
    }

    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center p-4 text-center'>
                <h1 className='text-blue-700 font-bold text-8xl '>LET’S VOTE!</h1>
                <p className='p-5'>The most important information about Boston&#39;s municiple elections to help you naviagte your voting journey</p>
            </div>


            <div className='flex flex-col justify-center items-center p-4'>
                <ButtonFill name='Your Voter Info' onClick={() => handleClick('/voterInfo')} className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFill name='How do I register' onClick={() => handleClick('/earlyVoting')} variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
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
                <Button variant="outlined" className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100'>What&#39;s on the Ballot </Button>
                <Button variant="outlined" className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' >What are my voting options </Button>

            </div>




        </div>
    )
}