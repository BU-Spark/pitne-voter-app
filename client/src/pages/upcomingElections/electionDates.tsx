'use client';
import react from 'react';
import { useState, useEffect } from 'react';
import ElectionCard from './electionCard';
import { BostonMunicipalAPI } from '@/common';

interface ElectionDateObject {
    attributes: {
        ElectionDate: Date;
        ElectionName: string;
        RegistrationDate?: Date;
    }
}

// use this to map over the election dates from strapi 
export default function ElectionDates() {
    const [electionDates, setElectionDates] = useState<ElectionDateObject[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [sortedElectionDates, setSortedElectionDates] = useState<ElectionDateObject[]>([])


    useEffect(() => {
        const fetchElectionDates = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(BostonMunicipalAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const electionData = await response.json();
                    const processedData = electionData.data.map((item: any) => ({
                        ...item,
                        attributes: {
                            ...item.attributes,
                            ElectionDate: new Date(item.attributes.ElectionDate),
                            RegistrationDate: item.attributes.RegistrationDate ? new Date(item.attributes.RegistrationDate) : undefined
                        }
                    }));
                    setElectionDates(processedData);
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


    return (
        <div>
            {isLoading ? ( null
            ) : (
                <div>
                    {sortedElectionDates.length === 0 ? (
                        <p className='text-xl'>No upcoming elections</p>
                    ) : (
                        <div className="flex items-center justify-center flex-wrap">
                           
                            {sortedElectionDates.map((election, index) => (
                                <ElectionCard 
                                    key={index}
                                    electionName={election.attributes.ElectionName} 
                                    electionDate={election.attributes.ElectionDate} 
                                    registrationDate={election.attributes.RegistrationDate} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}