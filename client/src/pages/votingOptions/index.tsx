import React from 'react'
import DropDownInfo from './DropDownInfo';
import NavBar from '@/components/nav/NavBar';

const VotingOptions = () => {
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='pb-2 text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Voting Options</h1>
                <h1 className='font-semibold text-2xl p-5'>Everything you need to know about your voting options made simple!</h1>
            </div>
            <DropDownInfo />
        </div>
    )
}

export default VotingOptions;