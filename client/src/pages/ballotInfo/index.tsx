import ButtonFill from "@/components/button/ButtonFill"
import { Box, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import DropDown from './dropDown';
import HelpIcon from '@mui/icons-material/Help';
import BoxAddress from "./boxAddress";




export default function BallotInfo() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <div className=''>

            <div className='p-4 text-center '>
                <h1 className='text-blue-700 font-bold text-6xl '>Ballot Info</h1>
                <h1 className='font-semibold text-xl p-5 mt-2' >Explore the elections, candidates, and crucial issues
                    personalized to your community.</h1>
            </div>

            <div className='flex flex-col justify-center items-center p-2'>
                <BoxAddress />
                <ButtonFill name='Submit Address' link='/submitAddress' variant='outlined' className='p-4 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-blue-100' />

            </div>


            <div className='grid grid-cols-4'>
                <div className='md:col-span-1 hidden md:block'>
                </div>
                <div className="space-y-8 mx-10 my-8 p-8 rounded-2xl shadow-2xl border border-gray-200  col-span-4 lg:col-span-2 bg-white">
                    <div className="space-y-4 w-full px-4">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-gray-600'>Preliminary Municipal Election</h1>
                            {/* Replace with your Checkbox component with proper props */}
                            {/* <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} /> */}
                        </div>
                        <div className="border-b border-gray-300"></div> {/* Line between rows */}
                        <div className="flex justify-between items-center">
                            <h1 className='font-semibold'>Sept 12, 2023</h1>
                            <h1 className='font-semibold'>155 days</h1>
                        </div>
                    </div>
                    <div className="space-y-4 w-full px-4">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-gray-600'> Municipal Election</h1>
                            {/* Replace with your Checkbox component with proper props */}
                            {/* <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} /> */}
                        </div>
                        <div className="border-b border-gray-300"></div> {/* Line between rows */}
                        <div className="flex justify-between items-center">
                            <h1 className='font-semibold'>Nov 7, 2023</h1>
                            <h1 className='font-semibold'>211 days</h1>
                        </div>
                    </div>
                </div>
                <div className='md:col-span-1 hidden md:block'>
                </div>
            </div>


            <div className='flex flex-col justify-center items-center p-8 my-6'>
                <h1 className='font-semibold text-center mx-6 my-4 text-xl' style={{ fontFamily: 'Arial, sans-serif' }}><strong>What&apos;s on the Ballot?</strong></h1>
                <DropDown ></DropDown>
            </div>

            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-l'>You may be wondering ...</h1>
                <ButtonFill name='What are my Voting Options' link='/votingOptions' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />

            </div>


        </div>



    )
}