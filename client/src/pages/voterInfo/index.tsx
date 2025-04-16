'use client';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { Typography } from '@mui/material';
import AddressForm from './addressForm';
import ElectionDates from './electionDates'; // Import the ElectionDates component

interface PollingInfo {
    location: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    room: string | null;
    instructions: string | null;
    ward: number | null;
    precinct: number | null;
}

export default function VoterInfo() {
    const [pollingInfo, setPollingInfo] = useState<PollingInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setPollingInformation = (info: PollingInfo) => {
        setPollingInfo(info);
        setError(null);
    };

    // Function to handle smooth scrolling (similar to UpcomingElections)
    const scrollToElectionDates = () => {
        const electionDatesSection = document.getElementById('election-dates');
        if (electionDatesSection) {
            electionDatesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Side-by-side containers with 30/70 split */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                {/* Left Container - Voter Information (30% width) */}
                <div className="bg-white p-6 rounded-lg w-full md:w-[30%]"> {/* Changed bg-blue-50 to bg-white */}
                    {/* Upcoming Dates Section with ElectionDates component */}
                    <div id="election-dates" className="mb-6 bg-white p-4 rounded-lg border-white"> {/* Changed bg-sky-100 to bg-white */}
                        <h2 className="text-xl font-semibold text-black-800 pt-10">VOTER INFO</h2>
                        <hr className="border-t-6 border-black mb-4"/> {/* Added horizontal line here */}
                        <div className="flex flex-col border-white px-3 py-3">
                            <ElectionDates />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Typography variant="body1" className="mb-3 text-sm pl-3">
                            Here is everything you need to know about your voter status and personal voting logistics!
                        </Typography>

                        <div>
                            <h2 className="text-lg font-semibold mb-1 text-red-600 pl-3">Your County:</h2>
                            <p className="text-xs md:text-sm mb-2 pl-3">
                                <em>
                                Your county determines your specific polling location, the local candidates you can vote for,
                                and the ballot measures specific to your area.
                                </em>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-1 text-red-600 pl-3">Polling Location:</h2>
                            <p className="text-xs md:text-sm pl-3">
                                <em>
                                Reminder: You can vote at any polling location during the early voting period,
                                but you <strong className="font-bold">MUST</strong> vote at the location on the right during election day
                                based on your address.
                                </em>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Container - Address Form (70% width) */}
                <div className="bg-white p-6 rounded-lg w-full md:w-[70%]"> {/* Changed bg-blue-50 to bg-white */}
                    <div className="mb-6">
                        <h2 className="text-6xl font-bold text-red-600 mb-2 pt-40 pl-4">GET STARTED</h2>
                        <p className="text-sm md:text-base pl-4">
                            Enter your address below to view a personalized voting ballot and polling location!
                        </p>
                    </div>

                    <AddressForm
                        setPollingInformation={setPollingInformation}
                        setError={setError}
                    />
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
        </div>
    );
}