'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
    electionName: string;
    electionDate: Date;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const daysLeft = (date: Date): number | null => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize time to midnight

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize time

    // Check if the event is in a past year
    if (targetDate.getFullYear() < now.getFullYear()) {
        return null;
    }

    // Calculate days difference
    const timeDiff = targetDate.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return days >= 0 ? days : null; // Return null if the date has already passed
};

export default function ElectionCard({ electionName = 'Preliminary Municipal Election', electionDate }: Props) {
    const [displayElectionDate, setDisplayElectionDate] = useState('');
    const [displayRegistrationDate, setDisplayRegistrationDate] = useState('');
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const router = useRouter();

    const handleRedirect = () => {
        router.push({
            pathname: '/candidateInfo',
            query: { electionType: electionName },
        });
    };

    useEffect(() => {
        if (electionDate) {
            // Create a new Date object and set the time to midnight local time
            const electionDateObj = new Date(electionDate);
            electionDateObj.setHours(0, 0, 0, 0);

            const formattedElectionDate = electionDateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            setDisplayElectionDate(formattedElectionDate);

            // Calculate the registration date and set the time to midnight local time
            const registrationDate = new Date(electionDateObj);
            registrationDate.setDate(registrationDate.getDate() - 10);
            registrationDate.setHours(0, 0, 0, 0);

            const formattedRegistrationDate = registrationDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            setDisplayRegistrationDate(formattedRegistrationDate);

            const calculatedDays = daysLeft(registrationDate);
            setDaysRemaining(calculatedDays);
        }
    }, [electionDate, electionName]);

    if (daysLeft(new Date(displayElectionDate)) == null) {
        return null;
    } else {
        return (
            <div className="w-full max-w-[1240px] h-auto relative bg-white rounded-[20px] p-6 shadow-md mb-4 mx-auto">
                {/* Days Left on Top */}
                {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 10 && (
                    <div className="text-red-600 text-2xl font-semibold mb-4">
                        {daysRemaining} days left to register!
                    </div>
                )}

                {/* Combined Election and Registration Box */}
                <div className="w-full rounded-[20px] border-2 border-blue-700 p-6">
                    <div className="md:flex items-start justify-start gap-8">
                        {/* Left Side: Election Date and Time */}
                        <div className="flex-shrink-0 text-center">
                            <div className="inline-block relative shadow-lg mb-4">
                                <div className="text-blue-700 text-7xl font-semibold leading-none">
                                    {new Date(displayElectionDate).getDate()}
                                </div>
                                <div className="text-white text-5xl font-semibold bg-blue-700 rounded-br-2xl rounded-bl-2xl p-2 px-4 w-full flex items-center justify-center">
                                    {new Date(displayElectionDate).toLocaleString('default', { month: 'short' })}
                                </div>
                            </div>
                            <div className="text-blue-700 text-2xl mt-1 font-bold text-center">
                                from 7AM<br />to 8PM
                            </div>
                        </div>

                        {/* Middle: Election and Registration Details */}
                        <div className="flex-grow flex flex-col justify-start">
                            <div className="text-blue-700 text-3xl font-medium leading-tight mb-4 mt-4">
                                {electionName}
                            </div>
                            <div className="text-gray-600 text-xl mb-4">
                                <strong>Registration Deadline:</strong> {displayRegistrationDate} by 8PM
                            </div>
                        </div>

                        {/* Right Side: Buttons */}
                        <div className="flex-shrink-0 flex flex-col items-end justify-start">
                            <button
                                className="bg-blue-700 text-sky-50 rounded-lg py-2 px-6 mb-2 flex items-center w-48 justify-center"
                                onClick={() => {
                                    window.open(
                                        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${electionName}&dates=${formatDate(displayElectionDate)}/${formatDate(displayElectionDate)}&details=Don't+forget+to+vote+in+the+${electionName}+from+7AM+to+8PM`,
                                        '_blank'
                                    );
                                }}
                            >
                                <span className="mr-2">+</span> Add to calendar
                            </button>
                            <button
                                className="border border-blue-700 text-blue-700 rounded-lg py-2 px-3 mb-2 flex items-center w-50 justify-center"
                                onClick={() => {
                                    window.open('https://www.sec.state.ma.us/ovr/', '_blank');
                                }}
                            >
                                Registration Status
                                <span className="ml-2">→</span>
                            </button>
                            <button
                                className="border border-blue-700 text-blue-700 rounded-lg py-2 px-6 flex items-center w-48 justify-center"
                                onClick={handleRedirect}
                            >
                                Candidate info
                                <span className="ml-2">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}