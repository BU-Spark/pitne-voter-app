import React from 'react';
import Button from '@mui/material/Button';
import '@/app/globals.css'
import ButtonFill from '@/components/button/ButtonFill';
import BoxField from '@/components/box/BoxField';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Image from 'next/image'


export default function DropBoxLocations() {
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 text-center mb-10'>
                <h1 className='text-blue-700 font-bold text-6xl '>Drop Box Locations</h1>
                <h1 className='font-semibold text-xl p-5'>Find the nearest ballot drop-off station and early voting locations in your area</h1>
            </div>

           <div className='flex flex-col justify-center items-center p-4 my-10'>
                <div className='flex items-center space-x-2'>
                    <BoxField />
                    <div className='bg-orange-400 rounded-full p-2'>
                    <SearchIcon/>
                    </div>
                </div>
            </div> 

            <div className='flex flex-row justify-center items-center p-4 m-10' > 
                <Box component="img"  alt="Map" src="/Map.png"/>
            </div>

            <div className='grid grid-cols-4'>
                <div className='md:col-span-1 hidden md:block'>
                </div>
                <div className="space-y-8 mx-10 my-8 p-8 rounded-2xl shadow-2xl border border-gray-200  col-span-4 lg:col-span-2 bg-white">
                    <div className="space-y-4 w-full px-4">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-2xl text-black-600 font-semibold'>BALLOT DROPBOX: ROXBURY BRANCH LIBRARY</h1>
                        </div>
                        <div className="border-b border-gray-300"></div> {/* Line between rows */}
                        <div className="flex justify-between items-center">
                            <h1 className='text-gray-600 font-semibold'>149 Dudley St., Roxbury, MA 02119</h1>
                        </div>
                    </div>
                    <div className="space-y-4 w-full px-4">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl text-black-600 font-semibold'>Hours</h1>
                        </div>
                        <div className="border-b border-gray-300"></div> 
                        <div className="flex justify-between items-center">
                            <h1 className='text-gray-600 font-semibold'>Available every day all day before 8 P.M. on election day</h1>
                        </div>
                    </div>
                </div>
                <div className='md:col-span-1 hidden md:block'>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-10'>
                <p className=' font-semibold p-4'>You may be wondering.....</p>
                <ButtonFill name='What&#39;s on the Ballot' link='/ballotInfo' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
            </div>
        </div>
    )
}