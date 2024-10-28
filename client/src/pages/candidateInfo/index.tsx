'use client';
import React, { useEffect, useState } from 'react';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';

interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Party: string;
        ElectionName: string;
        Bio: string;
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        [key: string]: string | undefined;
    };
}

// Component for Candidate Information Page
export default function CandidateInfo() {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await fetch(`${deployedCandidateAPI}/candidates?populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    setCandidate(data.data[0]);
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch candidate data');
                }
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchCandidateData();
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="candidate-profile">
            {candidate ? (
                <>
                    <h1>{candidate.attributes.Name}</h1>
                    <p><strong>District:</strong> {candidate.attributes.District}</p>
                    <p><strong>Party:</strong> {candidate.attributes.Party}</p>
                    <p><strong>Office Running For:</strong> {candidate.attributes.ElectionName}</p>
                    <p><strong>Bio:</strong> {candidate.attributes.Bio}</p>
                    
                    <div className="questionnaire-section">
                        <h2>Questionnaire</h2>
                        {Array.from({ length: 10 }).map((_, i) => {
                            const question = candidate.attributes[`Question${i + 1}` as keyof Candidate['attributes']];
                            const answer = candidate.attributes[`Answer${i + 1}` as keyof Candidate['attributes']];
                            return (
                                question && answer && (
                                    <div key={i}>
                                        <p><strong>{question}</strong></p>
                                        <p>{answer}</p>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </>
            ) : (
                <p>Candidate data not available.</p>
            )}
        </div>
    );
}
