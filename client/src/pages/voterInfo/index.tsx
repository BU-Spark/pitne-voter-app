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

            {/* Results Section */}
            {pollingInfo && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200"> {/* Already bg-white, keeping it for clarity if needed */}
                    <h2 className="text-xl font-bold mb-4 text-center">Your Voting Location</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="mb-1 text-sm"><span className="font-semibold">Location:</span> {pollingInfo.location}</p>
                            <p className="mb-1 text-sm"><span className="font-semibold">Address:</span> {pollingInfo.street}, {pollingInfo.city}, {pollingInfo.state} {pollingInfo.zip}</p>
                            <p className="mb-1 text-sm"><span className="font-semibold">Ward:</span> {pollingInfo.ward}</p>
                            <p className="mb-1 text-sm"><span className="font-semibold">Precinct:</span> {pollingInfo.precinct}</p>
                            {pollingInfo.room && <p className="mb-1 text-sm"><span className="font-semibold">Room:</span> {pollingInfo.room}</p>}
                            {pollingInfo.instructions && <p className="mb-1 text-sm"><span className="font-semibold">Instructions:</span> {pollingInfo.instructions}</p>}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <a
                                href={`https://www.sec.state.ma.us/WhereDoIVoteMA/ShowBallot/ViewMyBallot/BallotOut/ST/35/${pollingInfo.ward}/${pollingInfo.precinct}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mb-3 inline-block"
                            >
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded text-sm transition-colors">
                                    View Your Ballot
                                </button>
                            </a>
                            <img
                                src="/sample_ballot.png"
                                alt="Ballot Preview"
                                className="max-w-full h-auto rounded border border-gray-300"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}