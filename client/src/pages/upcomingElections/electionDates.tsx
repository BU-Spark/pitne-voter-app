'use client';
import react from 'react';
import { useState, useEffect } from 'react';
import ElectionCard from './electionCard';



// use this to map over the election dates from strapi 
export default function ElectionDates() {
    const [electionDates, setElectionDates] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchElectionDates = async () => {
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
            console.log(electionDates)
            console.log(electionDates[0].id)
            console.log(electionDates[0].attributes.ElectionName)
            console.log(electionDates[0].attributes.ElectionDate)
        }
    }, [electionDates])


    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {electionDates.length === 0 ? (
                        <p>No election dates found</p>
                    ) : (
                        <div className="flex items-center justify-center flex-wrap">
                            {electionDates.map((election, index) => (

                                <ElectionCard electionName={election.attributes.ElectionName} electionDate={election.attributes.ElectionDate} />

                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>


    )

}