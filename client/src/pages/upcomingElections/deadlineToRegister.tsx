"use client"
import React from 'react';
import { useEffect, useState } from 'react';

type Props = {
    deadline: String;
}

export default function DeadlineToRegister() {
    const [isLoading, setIsLoading] = useState(true);
    const [electionDates, setElectionDates] = useState([])

    useEffect(() => {
        const fetchElectionDates = async () => {
            console.log('here')
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:1337/api/boston-municipal-election-dates', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const electionData = await response.json();
                    setElectionDates(electionData.data[0])
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
            console.log(electionDates)
            setIsLoading(false)
        }
    }, [electionDates])


    return (
        <div>
            <p className='text-red-500'>Deadline to register: <strong>Aug 24, 2024</strong> </p>

        </div>

    )

} 