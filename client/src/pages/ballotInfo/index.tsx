import ButtonFill from "@/components/button/ButtonFill"
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import DropDown from './dropDown';



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
                <h1 className="font-semibold text-center my-2">Address</h1>
                <p className='p-4 bg-blue-100 rounded-full w-1/2 text-center'>500 Cherokee RD Boston MA, 02215</p>
                <ButtonFill name='Change Address' link='/changeAddress' className='p-4 mt-4 rounded-full bg-blue-700 text-white border-blue-800 ' />

            </div>


            <div className='flex flex-col items-center'>
                <div className="space-y-8 mx-10 my-8 p-8 rounded-lg border border-black max-w-2xl">
                    <div className="space-y-4 w-full px-4 ">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl'>Preliminary Municipal Election</h1>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div className="border-b border-gray-300"></div> {/* Line between rows */}
                        <div className="flex justify-between items-center">
                            <h1 className='font-bold'>Sept 12, 2023</h1>
                            <h1 className='font-bold'>155 days</h1>
                        </div>
                    </div>

                    <div className="space-y-4 w-full px-4">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl'>Preliminary Municipal Election</h1>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div className="border-b border-gray-300"></div> {/* Line between rows */}
                        <div className="flex justify-between items-center">
                            <h1 className='font-bold'>Sept 12, 2023</h1>
                            <h1 className='font-bold'>155 days</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <h1 className='font-semibold text-center my-4 text-2xl'>Whats on the Ballot</h1>
                <DropDown ></DropDown>
            </div>

            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-l'>You may be wondering ...</h1>
                <ButtonFill name='What are my Voting Options' link='/earlyVoting' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />

            </div>


        </div>



    )
}