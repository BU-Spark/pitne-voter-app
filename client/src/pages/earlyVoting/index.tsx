import React from 'react'
import Button from '@mui/material/Button';
import NavBar from "@/components/nav/NavBar";
import DropDownInfo from './DropDownInfo';

const EarlyVoting = () => {
  return (
        <div className=''>

            <div className='flex flex-col justify-center items-center p-4 text-center'>
                <h1 className='text-blue-700 font-bold text-5xl max-w-4xl'>
                    Everything you need to know about your voting options made simple!
                </h1>
            </div>

            <DropDownInfo />
        </div>
  )
}

export default EarlyVoting;