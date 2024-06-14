'use client';
import react from 'react';
import { useState, useEffect } from 'react';
import ElectionCard from './electionCard';



// use this to map over the election dates from strapi 
export default function ElectionDates() {
    const [electionDates, setElectionDates] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [sortedElectionDates, setSortedElectionDates] = useState([])

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
            const sortedDates = electionDates.sort((a, b) => {
                return new Date(a.attributes.ElectionDate) - new Date(b.attributes.ElectionDate);
            });
            setSortedElectionDates(sortedDates);
        }

    }, [electionDates]);


    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {sortedElectionDates.length === 0 ? (
                        <p>No election dates found</p>
                    ) : (
                        <div className="flex items-center justify-center flex-wrap">
                            {sortedElectionDates.map((election, index) => (
                                <ElectionCard key={index} electionName={election.attributes.ElectionName} electionDate={election.attributes.ElectionDate} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>


    )

}