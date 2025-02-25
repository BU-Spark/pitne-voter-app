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
    const timeDiff = date.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days < 0 ? null : days; // Return null if days are negative
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

    return (
        <div className="w-full max-w-[1240px] h-auto relative bg-white rounded-[20px] border border-blue-700 p-6 shadow-md mb-4">
            {/* Days Left on Top */}
            {daysRemaining !== null && (
                <div className="text-red-600 text-2xl font-semibold mb-4">
                    {daysRemaining} days left!
                </div>
            )}

            <div className="md:flex items-start justify-start gap-8">
                {/* Left Side: Date and Time */}
                <div className="flex-shrink-0 text-center">
                    <div className="inline-block relative shadow-lg mb-4">
                        <div className="text-blue-700 text-7xl font-semibold leading-none">
                            {new Date(displayRegistrationDate).getDate()}
                        </div>
                        <div className="text-white text-5xl font-semibold bg-blue-700 rounded-br-2xl rounded-bl-2xl p-2 px-4 w-full flex items-center justify-center">
                            {new Date(displayRegistrationDate).toLocaleString('default', { month: 'short' })}
                        </div>
                    </div>
                    <div className="text-blue-700 text-2xl mt-1 font-bold">
                        @ 5PM
                    </div>
                </div>

                {/* Middle: Election Label */}
                <div className="flex-grow flex flex-col justify-start">
                    <div className="text-blue-700 text-3xl font-medium leading-tight mb-4 mt-4">
                        Deadline for registration of voters for {electionName}
                    </div>
                </div>

                {/* Right Side: Buttons */}
                <div className="flex-shrink-0 flex flex-col items-end justify-start">
                    <button
                        className="bg-blue-700 text-sky-50 rounded-lg py-2 px-6 mb-2 flex items-center w-48 justify-center"
                        onClick={() => {
                            window.open(
                                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Registration+Deadline+for+${electionName}&dates=${formatDate(displayRegistrationDate)}/${formatDate(displayRegistrationDate)}&details=Go+Register+For+${electionName}+by+5pm`,
                                '_blank'
                            );
                        }}
                    >
                        <span className="mr-2">+</span> Add to calendar
                    </button>
                    <button className="border border-blue-700 text-blue-700 rounded-lg py-2 px-6 flex items-center w-48 justify-center"
                        onClick={handleRedirect}
                    >
                        Candidate info
                        <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
