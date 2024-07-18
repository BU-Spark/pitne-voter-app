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
import { Box } from "@mui/material";
import { Container, Grid } from '@mui/material';
import CustomCard from '@/components/button//CustomCard';

export default function VoterInfo() {
    return (
        <div>
               {/* Header */}
             
               <div className = 'flex flex-row'>
               { /* <div className=" mt-40 m-20 mr-0">
               <img src="icon2.png" alt="Pattern" className='w-auto h-20 '/>
               </div>
                 */}
               <div className='flex flex-col items-left p-20 pt-40  text-left  bg-sky-50'>
                <div className='flex items-center'>
                <h1 className='text-blue-700 font-bold text-6xl bg-blue-700  bg-clip-text text-transparent'>Your Voter Info </h1>
            
        </div>
                <p className='font-semibold text-2xl pt-8 '>   Here is everything you need to know about your
                <br />
                voter status and personal voting logistics!</p>
        </div>
        </div>

   
                {/* Polling location address form */}   
            <div className=' m-20 flex flex-col lg:flex-row'>
            <div className='inline-block w-full lg:w-1/2 mr-10'>
                    <h1 className='font-semibold text-left mb-2 text-blue-700 text-3xl'>Your County: Suffolk</h1>
                    <p className='mb-10 text-xl my-2 italic '>
                        Your county determines your specific polling location, the local candidates you can vote for, and the ballot measures specific to your area.
                    </p>
                    
                 <div className='inline-block'>
                    <h1 className='font-semibold text-blue-700 text-left text-3xl'>Polling Location</h1>
                    <p className='text-xl my-2 italic '>
                        Reminder: You can vote at any polling location during the early voting period, but you <strong>MUST</strong> vote at the location below during election day based on your address.
                    </p>
                </div>
                </div>
                    <div className= "justify-center items-center">
            <AddressForm />
            </div>
        </div>
       
                <div className= 'p-4 pt-20 bg-blue-200'>
                
                    {/* Cards */}
            <div className='flex flex-col md:flex-row justify-center items-center p-4 '>


                <CustomCard
                    image="pattern5.png"
                    disableTitle={true}     
                    description="Curious about your voting status? Check it here!"
                    className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200'
                    buttonText="Registration Status"
                    buttonLink="'https://www.sec.state.ma.us/voterregistrationsearch/'" />
    
            <div className="m-10"></div>
    
     
            <CustomCard
              image="pattern4.png"
              disableTitle={true}
              description="Can&#39;t vote in person or want to vote early?"
              className="p-4 m-4  rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200"
              buttonText="Early Voting Options"
              buttonLink="/votingOptions"
            />
          </div>

    

                {/* Footer */}
                <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                    <h1 className='font-semibold text-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/2'>Now that you know where you can vote, let&#39;s explore exactly who and what you are voting for.</h1>
                    <ButtonFill name='Ballot Info' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white hover:bg-blue-800' />
                </div>
            </div>
            </div>
    )
}