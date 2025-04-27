import React, { useState } from 'react'
import DropDownInfo from './DropDownInfo';
import NavBar from '@/components/nav/NavBar';
import ButtonFill from '@/components/button/ButtonFill';

const tabMap = [
    { label: 'Election Day', key: 'Election Day Voting' },
    { label: 'Ballot Drop-Off', key: 'Drop-Off Ballot' },
    { label: 'Request Absentee Ballot', key: 'Request Absentee Ballot' },
    { label: 'In-Person Early Voting', key: 'In-Person Early Voting' },
    { label: 'Mail-In Ballot', key: 'Mail-In Ballot' },
  ];

const VotingOptions = () => {
    const [activeTab, setActiveTab] = useState('Election Day Voting');
    return (
        <div className = "relative">
                {/* Header */}
            <div className='flex flex-col items-center p-10 sm:p-20 pt-28 sm:pt-40 text-center bg-[#F5F5F5]'>
                <div className='flex items-center'>
                    <h1 className='text-4xl sm:text-6xl font-bold'>
                    <span className='text-red-600'>VOTING</span> <span className='text-black'>OPTIONS</span>
                    </h1>
                </div>
                <p className='font-medium text-lg sm:text-xl mt-4'>Everything you need to know about your voting options</p>
                <img src='/made-simple.png' alt='Made simple' className='w-[220px] mt-4' />
            </div>


            {/* Tab Navigation */}
            <div className="flex justify-center mt-8 px-4">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b-2 border-gray-200 text-base sm:text-lg font-medium">
                {tabMap.map(({ label, key }) => (
                    <button
                    key={key}
                    className={`pb-2 px-2 ${
                        activeTab === key
                        ? 'border-b-4 border-red-500 text-red-600'
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                    onClick={() => setActiveTab(key)}
                    >
                    {label}
                    </button>
                ))}
                </div>
            </div>

            <div className = 'p-6 sm:p-20'>
                <DropDownInfo activeTab={activeTab}/>
            </div>

            {/* Additional info button */}
         
            <div className='flex flex-col justify-center items-center p-6 sm:p-10 text-center my-6'>
                <h1 className='text-lg sm:text-xl'>Want to learn more about early voting in Boston?</h1>
                <div className="w-full sm:w-auto">
                    <ButtonFill
                        name="City of Boston Website"
                        link="https://www.boston.gov/departments/elections/early-voting-boston"
                        className="p-4 m-4 rounded-full bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                    />
                </div>
            </div>

            {/* Contact info of Boston Elections Department */}
            <div className="p-6 sm:p-10 text-center text-lg sm:text-xl bg-[#F5F5F5]">
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