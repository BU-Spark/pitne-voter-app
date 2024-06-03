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
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='text-blue-700 font-bold text-6xl '>Drop Box Locations</h1>
                <p className=''>Find the nearest ballot drop-off station and early voting locations in your area:</p>
            </div>

           <div className='flex flex-col justify-center items-center p-4 my-10'>
           <div className='flex items-center space-x-2'>
                    <BoxField />
                    <div className='bg-orange-400 rounded-full p-2'>
                    <SearchIcon/>
                    </div>
                </div>
            </div> 

            <div className='flex flex-col justify-center items-center p-4 my-10'>
                <Box component="img" sx={{height: 400, width: 400}}
                alt="Map" src="/Map.png"/>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <p className='p-4 bg-white rounded-full w-1/2 text-center'><strong> County: </strong>Suffolk</p>
            </div>

            <div className='flex flex-col justify-center items-center p-4 my-10'>
                <p className=' font-semibold p-4'>You may be wondering.....</p>
                <ButtonFill name='What&#39;s on the Ballot' link='/ballotInfo' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-100' />
            </div>
        </div>

    )
}