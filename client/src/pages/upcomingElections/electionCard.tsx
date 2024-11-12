'use client';
import react from 'react';
import { useState, useEffect } from 'react';

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

export default function ElectionCard({ electionName = 'Preliminary Municipal Election', electionDate }: Props) {
    const [displayElectionDate, setDisplayElectionDate] = useState('')
    const [displayRegistrationDate, setDisplayRegistrationDate] = useState('')

    useEffect(() => {
        if (electionDate && electionName) {
            // Create a new Date object and set the time to midnight local time
            const electionDateObj = new Date(electionDate);
            electionDateObj.setHours(0, 0, 0, 0);

            electionDateObj.setDate(electionDateObj.getDate() + 1)

            const formattedElectionDate = electionDateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            setDisplayElectionDate(formattedElectionDate);

            // Calculate the registration date and set the time to midnight local time
            const registrationDate = new Date(electionDateObj);
            registrationDate.setDate(registrationDate.getDate() - 10);
            registrationDate.setHours(0, 0, 0, 0);
            const formattedRegistrationDate = registrationDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            setDisplayRegistrationDate(formattedRegistrationDate);
        }
    }, [electionName, electionDate]);

    return (
        <div className="p-4">
            <div className="event-card bg-white rounded-2xl p-8 shadow-lg max-w-xl mx-auto">

                {/* Election Name at the top in large font */}
                <div className="text-center mb-8">
                    <p className="text-blue-900 text-3xl font-bold">
                        {electionName}
                    </p>
                </div>

                {/* Two-column layout on large screens for Registration Deadline and Election Day, one column layout when !lg */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* Registration Deadline */}
                    <div className="text-center bg-gray-100 rounded-lg p-6">
                        <p className="text-blue-900 text-lg font-semibold">
                            Registration Deadline
                        </p>
                        <p className="font-semibold text-red-600 text-md mt-2">
                            {displayRegistrationDate} at 5PM
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            onClick={() => {
                                window.open(
                                    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Registration+Deadline+for+${electionName}&dates=${formatDate(displayRegistrationDate)}/${formatDate(displayRegistrationDate)}&details=Go+Register+For+${electionName}+by+5pm`,
                                    '_blank'
                                );
                            }}
                        >
                            Add to Google Calendar
                        </button>
                    </div>

                    {/* Election Day */}
                    <div className="text-center bg-gray-100 rounded-lg p-6">
                        <p className="text-blue-900 text-lg font-semibold">
                            Election Day
                        </p>
                        <p className="font-semibold text-red-600 text-md mt-2">
                            {displayElectionDate} from 7AM to 8PM
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            onClick={() => {
                                window.open(
                                    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Vote+Today:+${electionName}&dates=${formatDate(displayElectionDate)}/${formatDate(displayElectionDate)}&details=Go+Vote+In+${electionName}.+Polls+close+at+8pm`,
                                    '_blank'
                                );
                            }}
                        >
                            Add to Google Calendar
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );

}

