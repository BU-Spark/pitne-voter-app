/* Page for voter's polling location and other relevant voter info
 * Using Google Civic API for retrieving polling locations
 * https://developers.google.com/civic-information/docs/using_api#auth
*/

import React from 'react';
import '@/app/globals.css'
import ButtonFill from '@/components/button/ButtonFill';
import NavBar from '@/components/nav/NavBar';
import AddressForm from './addressForm';
import ButtonFillEx from '@/components/button/ButtonFillEx';

export default function VoterInfo() {
    return (
        <div>
            <NavBar />
            {/* Header */}
            <div className="bg-oval-wrapper flex flex-col justify-center">
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Your Voter Info</h1>
                <h1 className='font-semibold text-2xl p-5 mt-2' >Here is everything you need to know about your <br />voter status and personal voting logistics!</h1>
                <p className='text-xl mt-10'>Can&#39;t vote in person or want to vote early?</p>
                <ButtonFill name='Early Voting Options' link='/votingOptions' className='p-4 mt-4 rounded-full bg-blue-700 text-white border-blue-800 ' />
            </div>


            {/* County (fixed for all Boston voters) */}
            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <h1 className='font-semibold text-center my-4 text-2xl'>Basic Voter Info</h1>
                <div className='grid grid-cols-4 mt-1'>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                    <div className="space-y-4 mx-10 my-1 p-8 rounded-2xl shadow-xl border border-gray-200  col-span-4 lg:col-span-2 bg-blue-100">
                        <div className="space-y-4 w-full px-4">
                            <div className="w-full px-4 text-center">
                                <p className='text-xl text-black-600 '>County: Suffolk</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                </div>
            </div>


            {/* Polling location address form */}
            <div className='flex flex-col justify-center items-center p-4 my-6'>
                <h1 className='font-semibold text-left mb-2 text-2xl' >Polling Location</h1>
                <p className='text-lg my-2 text-center md:w-1/2 lg:w-1/2 italic'>Reminder: You can vote at any polling location during the early voting period, but you <strong>MUST</strong> vote at the location below during election day based on your address.</p>
                <AddressForm />
           </div>

            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-xl md:w-1/2 lg:w-1/2'>Curious about your voting status? Check it here!</h1>
                <ButtonFillEx name='-> Registration Status' link='https://www.sec.state.ma.us/voterregistrationsearch/' variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />
            </div>

            {/* Footer */}
            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-xl md:w-1/2 lg:w-1/2'>Now that you know where you can vote, let&#39;s explore exactly who and what you are voting for.</h1>
                <ButtonFill name='Ballot Info' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
            </div>
            </div>
        </div>
    )
}