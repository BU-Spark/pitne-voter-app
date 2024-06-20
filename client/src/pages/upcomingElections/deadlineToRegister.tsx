"use client";
import React from 'react';
import { useEffect, useState } from 'react';

type Props = {
    deadline: String;
}

interface ElectionDateAttributes {
    ElectionDate: string;
}

interface ElectionDateObject {
    attributes: ElectionDateAttributes;
}


export default function DeadlineToRegister() {
    const [isLoading, setIsLoading] = useState(true);
    const [electionDates, setElectionDates] = useState([])
    const [displayRegistrationDate, setDisplayRegistrationDate] = useState('No upcoming deadline')

    const localAPI = 'http://localhost:1337/api/boston-municipal-election-dates'
    const deployedAPI = 'https://pitne-voter-app-production.up.railway.app/api/boston-municipal-election-dates'

    useEffect(() => {
        const fetchElectionDates = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(deployedAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const electionData = await response.json();
                    setElectionDates(electionData.data)
                    setIsLoading(false);

                } else {
                    alert('Error fetching election dates')
                    setIsLoading(false)
                }

            } catch (e) {
                console.log(e);
                setIsLoading(false)
            }
        }
        fetchElectionDates();
    }, [])

    useEffect(() => {
        if (electionDates.length > 0) {
            setIsLoading(false);

            const sortedDates = electionDates
                .map((dateObj: ElectionDateObject) => new Date(dateObj.attributes.ElectionDate))
                .sort((a, b) => a.getTime() - b.getTime());


            let minDate = sortedDates[0];

            sortedDates.forEach(date => {
                if (date < minDate) {
                    minDate = date;
                }
            });

            minDate.setDate(minDate.getDate() - 10);
            minDate.setHours(0, 0, 0, 0);

            minDate.setDate(minDate.getDate() + 1)

            const formattedRegistrationDate = minDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            setDisplayRegistrationDate(formattedRegistrationDate);
        }
    }, [electionDates]);


    return (
        <div>
            {isLoading ? (
                <p>Loading Deadlines to Register...</p>
            ) : (
                <div>
                    {<p className='text-red-500 text-xl'>Deadline to register: 
                        <strong>&nbsp;{displayRegistrationDate}</strong>
                    </p>}
                </div>)}
        </div>
    )

} 