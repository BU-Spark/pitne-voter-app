'use client';
import react from 'react';
import { useState, useEffect } from 'react';
import ElectionCheckboxCard from './electionCheckboxCard';


interface ElectionDateObject {
    attributes: {
        ElectionDate: Date;
        ElectionName: string;
    }
}

export default function ElectionCheckbox() {
    const [electionDates, setElectionDates] = useState<ElectionDateObject[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [sortedElectionDates, setSortedElectionDates] = useState<ElectionDateObject[]>([])
    const [selectedElection, setSelectedElection] = useState<string | null>(null);


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
            const sortedDates = electionDates.sort((a: ElectionDateObject, b: ElectionDateObject) => {
                return new Date(a.attributes.ElectionDate).getTime() - new Date(b.attributes.ElectionDate).getTime();
            });
            setSortedElectionDates(sortedDates);
        }

    }, [electionDates]);

    const handleCheckboxChange = (electionName: string) => {
        setSelectedElection(electionName);
        console.log(electionName);
    };


    return (
        <div className='flex justify-center'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='lg:w-1/2 md:w-3/4 sm:w-full w-full'>
                    {sortedElectionDates.length === 0 ? (
                        <p>No election dates found</p>
                    ) : (
                            <div className="flex flex-col items-center justify-center bg-white border-gray-200 rounded-2xl shadow-2xl border space-y-8 mx-10 my-8 p-8">
                                {sortedElectionDates.map((election, index) => (
                                    <ElectionCheckboxCard key={index} electionName={election.attributes.ElectionName} electionDate={election.attributes.ElectionDate}
                                        onCheckboxChange={handleCheckboxChange}
                                        isChecked={selectedElection === election.attributes.ElectionName} />
                                ))}

                            </div>
                    )}
                </div>
            )}
        </div>


    )

}