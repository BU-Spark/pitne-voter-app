'use client';
import React from 'react';
import '@/app/globals.css';
import ButtonFill from '@/components/button/ButtonFill';
import NavBar from '@/components/nav/NavBar';
import ButtonFillEx from '@/components/button/ButtonFillEx';

export default function DropBoxLocations() {
    return (
        <div className="bg-white min-h-screen">
            <NavBar />

            {/* Header */}
            <div className="text-center pt-36 px-4">
                <h1 className="text-5xl font-extrabold">
                    <span className="text-red-600">DROP BOX </span>
                    <span className="text-black">LOCATIONS</span>
                </h1>
                <p className="text-lg mt-4 font-medium text-gray-700">
                    Find the nearest ballot drop-off station in your area
                </p>
            </div>

            {/* Map */}
            <div className="flex justify-center mt-10">
                <iframe
                    src="https://tuftsgis.maps.arcgis.com/apps/instant/media/index.html?appid=9a84a0d949274b559b800b9ffc043b04"
                    width="800"
                    height="500"
                    style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    allow="geolocation"
                    allowFullScreen
                >
                    iFrames are not supported on this page.
                </iframe>
            </div>

            {/* Early Voting Info */}
            <div className="text-center px-6 mt-12">
                <h2 className="text-2xl font-bold text-gray-800">Need to know the early voting locations?</h2>
                <p className="text-md mt-2 text-gray-700 max-w-xl mx-auto">
                    They are typically available 1–2 weeks before the early voting period starts for an election.
                    <br />
                    See the link below to find the location nearest to you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-3">
                    <div className="flex flex-col items-center">
                        <img src="/location_on_black.svg" alt="Location Icon" className="w-20 h-20 p-2 box-border" />
                        <ButtonFill
                        name="Early Voting Locations"
                        link="https://www.boston.gov/departments/elections/early-voting-boston#map--737516"
                        className="bg-red-600 text-white text-xs hover:bg-red-700 rounded-lg py-3 px-3 flex items-center w-48 justify-center"
                        />
                    </div>
                </div>
        </div>
            {/* Footer Section */}
            <div className="text-center px-6 mt-16 mb-100 pb-40">
                <h2 className="text-xl font-semibold text-gray-800">You may also be wondering...</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
                    <div className="flex flex-col items-center">
                        <img src="/question-circle.svg" alt="Question Icon" className="w-14 h-14 p-2 box-border" />
                        <ButtonFill name="What&#39;s on the Ballot" link="/voterInfo" className="bg-red-600 text-white text-xs hover:bg-red-700 rounded-lg py-3 px-3 flex items-center w-48 justify-center" />
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/Info_black.svg" alt="Info Icon" className="w-14 h-14 p-2 box-border" />
                        <ButtonFill name="Basic Election Info" link="/upcomingElections" className="bg-red-600 text-white text-xs hover:bg-red-700 rounded-lg py-3 px-3 flex items-center w-48 justify-center" />
                    </div>
                </div>
            </div>
    </div>
    );
}
