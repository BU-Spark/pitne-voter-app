'use client';
import react from 'react';
import { useState, useEffect } from 'react';


// use this to map over the election dates from strapi 
export default function ElectionDates() {
    const [electionDates, setElectionDates] = useState([]);

    useEffect(() => {
        const fetchElectionDates = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/boston-municipal-election-dates', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setElectionDates(data.data); // Adjust according to the structure of your API response
                console.log(data.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchElectionDates();
    }, []);

    return (
        <div className='bg-gray-100 m-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>
            <p className="font-semibold text-red-500 m-2 text-center ">SEPT 2 @ 5PM</p>
            <p className='m-2 text-left'>Deadline for registration of voters for Preliminary Municipal Election.</p>
        </div>
    )

}