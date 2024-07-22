import React from 'react'
import DropDownInfo from './DropDownInfo';
import NavBar from '@/components/nav/NavBar';
import ButtonFill from '@/components/button/ButtonFill';

const VotingOptions = () => {
    return (
      <div>
        
                 {/* Header */}
                 <div className='flex flex-col items-left p-20 pt-40 text-left bg-sky-50'>
            <div className='flex items-center'>
                <h1 className='text-blue-700 font-bold text-6xl bg-blue-700 bg-clip-text text-transparent'> Voting Options</h1>
               
            </div>
            <p className='font-semibold text-2xl pt-8 '>Everything you need to know about your voting options made simple!</p>
        </div>
        <div className = 'p-20'>
            <DropDownInfo />
            </div>
            {/* Additional info button */}
         
            <div className='flex flex-col justify-center items-center p-10 text-center my-6'>
                <h1 className='text-xl'>Want to learn more about early voting in Boston?</h1>
                <ButtonFill name="Official Website" link="https://www.boston.gov/departments/elections/early-voting-boston" className='p-4 m-4 rounded-full  border-blue-800  hover:bg-blue-800' />
            </div>

            {/* Contact info of Boston Elections Department */}
            <div className="p-10 text-center text-xl bg-sky-100">
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