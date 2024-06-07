import React from 'react'
import DropDownInfo from './DropDownInfo';
import NavBar from '@/components/nav/NavBar';

const VotingOptions = () => {
    return (
        <div className=''>
            <NavBar />
            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='text-blue-700 font-bold text-6xl '>Voting Options</h1>
                <h1 className='font-semibold text-xl p-5'>Everything you need to know about your voting options made simple!</h1>
            </div>
            <DropDownInfo />
        </div>
    )
}

export default VotingOptions;