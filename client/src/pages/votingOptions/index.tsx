import React from 'react'
import DropDownInfo from './DropDownInfo';
import NavBar from '@/components/nav/NavBar';
import ButtonFillEx from '@/components/button/ButtonFillEx';

const VotingOptions = () => {
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='pb-2 text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Voting Options</h1>
                <h1 className='font-semibold text-2xl p-5'>Everything you need to know about your voting options made simple!</h1>
            </div>
            <DropDownInfo />

            {/* Additional info button */}
            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='text-xl'>Want to learn more about early voting in Boston?</h1>
                <ButtonFillEx name="Official Website" link="https://www.boston.gov/departments/elections/early-voting-boston" className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
            </div>

            {/* Contact info of Boston Elections Department */}
            <div className="my-6 text-center text-xl">
                <p>Need more information?</p>
                <p>Contact Boston Elections Department:</p>
                <strong>
                <p>617-635-8683</p>
                <p>election@boston.gov</p>
                </strong>
            </div>
        </div>
    )
}

export default VotingOptions;