'use client';
import react from 'react';
import { useState, useEffect } from 'react';

type Props = {
    electionName: string;
    electionDate: Date;
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
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="event-card bg-gray-100 rounded-xl p-4 flex-1">
                    <p className="font-semibold text-red-500 m-2 text-center">
                        {displayRegistrationDate} @ 5PM
                    </p>
                    <p className="m-2 text-center">
                        Deadline for registration of voters for <strong>{electionName}</strong>.
                    </p>
                </div>

                <div className="event-card bg-gray-100 rounded-xl p-4 flex-1">
                    <p className="font-semibold text-red-500 m-2 text-center">
                        {displayElectionDate} @ 7AM - 8PM
                    </p>
                    <p className="m-2 text-center">
                        <strong>{electionName}.</strong>
                    </p>
                </div>
            </div>
        </div>






    )
}

