'use client';
import React, { useState, useEffect } from 'react';
import ElectionCard from './electionCard';
import { BostonMunicipalAPI } from '@/common';

interface ElectionDateObject {
    attributes: {
        ElectionDate: Date;
        ElectionName: string;
    };
    customElectionName?: string;
}

export default function ElectionDates() {
    const [electionDates, setElectionDates] = useState<ElectionDateObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortedElectionDates, setSortedElectionDates] = useState<ElectionDateObject[]>([]);

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
                    setElectionDates(electionData.data);
                } else {
                    alert('Error fetching election dates');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchElectionDates();
    }, []);

    useEffect(() => {
        if (electionDates.length > 0) {
            const sortedDates = [...electionDates]
                .filter((election) => new Date(election.attributes.ElectionDate) > new Date())
                .sort(
                    (a, b) =>
                        new Date(a.attributes.ElectionDate).getTime() -
                        new Date(b.attributes.ElectionDate).getTime()
                )
                .slice(0, 2); // Get only the top 2 closest future elections

            const displayElections = [];
            if (sortedDates.length > 0) {
                displayElections.push({
                    ...sortedDates[0],
                    customElectionName: "Preliminary Municipal Election",
                });
            }
            if (sortedDates.length > 1) {
                displayElections.push({
                    ...sortedDates[1],
                    customElectionName: "Municipal Election",
                });
            }

            setSortedElectionDates(displayElections as any); // Type assertion to any to avoid interface mismatch temporarily
        }
    }, [electionDates]);


    return (
        <div className="bg-white rounded-lg border border-white">
            {isLoading ? (
                <p>Loading...</p>
            ) : sortedElectionDates.length === 0 ? (
                <p className="text-xl">No upcoming elections</p>
            ) : (
                <div>
                    {sortedElectionDates.map((election, index) => (
                        <ElectionCard
                            key={index}
                            electionName={election.customElectionName || election.attributes.ElectionName}
                            electionDate={election.attributes.ElectionDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}