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
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-4 mt-8'>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                    <div className="space-y-4 mx-10 my-1 py-8 rounded-2xl shadow-2xl border border-gray-200 col-span-4 lg:col-span-2 bg-white">
                        <div className="space-y-4 w-full px-4">
                            <div className="w-full px-4 text-left text-lg">
                                {sortedElectionDates.length === 0 ? (
                                    <p className='text-xl text-center'><strong>No upcoming elections</strong></p>
                                ) : (
                                    <div>
                                        {sortedElectionDates.map((election, index) => (
                                            <ElectionCheckboxCard key={index} electionName={election.attributes.ElectionName} electionDate={election.attributes.ElectionDate}
                                                onCheckboxChange={handleCheckboxChange}
                                                isChecked={selectedElection === election.attributes.ElectionName} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-1 hidden md:block'>
                    </div>
                </div>
            )}
        </div>
    )
}