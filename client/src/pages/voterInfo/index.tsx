/* Page for voter's polling location and other relevant voter info
 * Using BostonOpenData and GEOCODE Address API for retrieving polling locations
*/

import React, { useState } from 'react';
import '@/app/globals.css';
import ButtonFill from '@/components/button/ButtonFill';
import AddressForm from './addressForm';
import { Typography } from '@mui/material';
import CustomCard from '@/components/button/CustomCard';

interface PollingInfo {
    location: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    room: string | null;
    instructions: string | null;

    ward: number | null,
    precinct: number | null,
}

export default function VoterInfo() {
    const [pollingInfo, setPollingInfo] = useState<PollingInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setPollingInformation = (info: PollingInfo) => {
        setPollingInfo(info);
        setError(null);
    };

    return (
        <div>
            {/* Header */}
            <div className='text-left bg-sky-50 p-20 pt-40 pb-0'>
                <h1 className='text-blue-700 font-bold text-6xl bg-blue-700 bg-clip-text text-transparent'>
                    Your Voter Info
                </h1>
            </div>

            {/* Left and Right Paragraphs */}
            <div className='flex flex-row'>
                {/* Left Column */}
                <div className='flex flex-col items-left px-20 py-8 text-left bg-sky-50 w-1/2'>
                    <p className='font-semibold text-2xl'>
                        Here is everything you need to know about your
                        <br />
                        voter status and personal voting logistics!
                    </p>
                </div>

                {/* Right Column */}
                <div className='flex flex-col items-left px-20 py-8 text-left bg-sky-50 w-1/2'>
                    <p className='font-semibold text-2xl'>
                        Enter your address below to view a personalized
                        <br />
                        voting ballot and polling location!
                    </p>
                </div>
            </div>


            {/* Polling location address form */}
            <div className='m-20 flex flex-col lg:flex-row'>
                <div className='inline-block w-full lg:w-1/2 mr-10'>
                    <h1 className='font-semibold text-left mb-2 text-blue-700 text-3xl'>Your County: Suffolk</h1>
                    <p className='mb-10 text-xl my-2 italic'>
                        Your county determines your specific polling location, the local candidates you can vote for, and the ballot measures specific to your area.
                    </p>

                    <div className='inline-block'>
                        <h1 className='font-semibold text-blue-700 text-left text-3xl'>Polling Location</h1>
                        <p className='text-xl my-2 italic'>
                            Reminder: You can vote at any polling location during the early voting period, but you <strong>MUST</strong> vote at the location below during election day based on your address.
                        </p>
                    </div>
                </div>
                <div className="justify-center items-center">
                    <AddressForm setPollingInformation={setPollingInformation} setError={setError} />
                </div>
            </div>

            {/* Polling location if found, error if not */}
            {(pollingInfo || error) && (
                <div className="grid grid-cols-6 mt-8">
                    <div className="md:col-span-1 hidden md:block"></div>

                    <div className="space-y-4 lg:mx-6 md:mx-10 px-8 py-10 rounded-2xl shadow-2xl border border-gray-200 col-span-6 lg:col-span-4 bg-white">
                        <div className="space-y-4 w-full px-6">

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                                {/* First Column Content */}
                                <div className="text-left text-2xl">
                                    {pollingInfo && (
                                        <div>
                                            <p className="text-3xl font-bold">Your Voting Location:</p>
                                            <br />
                                            <p>Your Ward: {pollingInfo.ward}</p>
                                            <p>Your Precinct: {pollingInfo.precinct}</p>
                                            <br></br>
                                            <p>{pollingInfo.location}</p>
                                            <p>{pollingInfo.street}</p>
                                            <p>{pollingInfo.city}, {pollingInfo.state} {pollingInfo.zip}</p>
                                            <br /><p><strong>Polling Instructions:</strong></p>
                                            <br /><p><strong>{pollingInfo.room}</strong></p>
                                            <p><strong>{pollingInfo.instructions}</strong></p>
                                        </div>
                                    )}
                                    {error && (
                                        <Typography variant="h6" color="error">{error}</Typography>
                                    )}
                                </div>

                                {/* Second Column Content */}
                                <div className="space-y-2 text-center">
                                {pollingInfo && (
                                        <a
                                            href={`https://www.sec.state.ma.us/WhereDoIVoteMA/ShowBallot/ViewMyBallot/BallotOut/ST/35/${pollingInfo.ward}/${pollingInfo.precinct}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline text-xl"
                                        >
                                            View Your Ballot
                                            <img
                                                src="/sample_ballot.png" // Replace with the actual image path
                                                alt="Preview of the ballot website"
                                                className="w-full rounded-lg shadow-lg"
                                            />
                                        </a>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-1 hidden md:block"></div>
                </div>
            )}

            <br />
            <br />
            <br />
            <br />

            <div className='p-4 pt-20 bg-sky-100'>
                {/* Cards */}
                <div className='flex flex-col md:flex-row justify-center items-center p-4'>
                    <CustomCard
                        image="pattern5.png"
                        disableTitle={true}
                        description="Curious about your voting status? Check it here!"
                        className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200'
                        buttonText="Registration Status"
                        buttonLink="https://www.sec.state.ma.us/voterregistrationsearch/"
                    />
                    <div className="m-10"></div>
                    <CustomCard
                        image="pattern4.png"
                        disableTitle={true}
                        description="Can&#39;t vote in person or want to vote early?"
                        className="p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200"
                        buttonText="Early Voting Options"
                        buttonLink="/votingOptions"
                    />
                </div>

                {/* Footer */}
                {/* <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                    <h1 className='font-semibold text-xl w-full sm:w-1/2 md:w-1/2 lg:w-1/2'>
                        Now that you know where you can vote, let&#39;s explore exactly who and what you are voting for.
                    </h1>
                    <ButtonFill name='Ballot Info' link='/ballotInfo' className='p-4 m-4 rounded-full bg-blue-700 text-white hover:bg-blue-800' />
                </div> */}
            </div>
        </div>
    );
}