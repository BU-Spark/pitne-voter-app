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
        <div>
            <div className='bg-gray-100 m-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>
                <p className="font-semibold text-red-500 m-2 text-center ">{displayRegistrationDate} @ 5PM</p>
                <p className='m-2 text-left'>Deadline for registration of voters for {electionName}.</p>
            </div>

            <div className='bg-gray-100 mx-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>

                <p className="font-semibold text-red-500 m-2 text-center ">{displayElectionDate} @ 7AM - 8PM</p>
                <p className='m-2 text-left'>{electionName}.</p>
            </div>
        </div>




    )
}

