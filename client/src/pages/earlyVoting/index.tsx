import React from 'react'
import Button from '@mui/material/Button';
import NavBar from "@/components/nav/NavBar";
import DropDownInfo from './DropDownInfo';

const EarlyVoting = () => {
    return (
        <div className=''>

            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='text-blue-700 font-bold text-6xl '>Early Voting Options</h1>
                <h1 className='font-semibold text-xl p-5'>Everything you need to know about your voting options made simple!</h1>
            </div>
            <DropDownInfo />
        </div>
    )
}

export default EarlyVoting;