'use client';
import React, { useEffect, useState } from 'react';

interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Party: string;
        ElectionName: string;
        Bio?: string;
        Bio: string;
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        PhotoURL?: string;
        [key: string]: string | undefined;
    };
}

// Component for Candidate Information Page
export default function CandidateInfo() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]); //holds array of candiate objects
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidateData = async () => {
            console.log("Fetching candidate data...");
            try {
                const response = await fetch(`https://pitne-voter-app-production.up.railway.app/api/candidates?populate=Headshot`);
                const response = await fetch(`https://pitne-voter-app-production.up.railway.app/api/candidates`);
                console.log("API Response Status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched data:", data);

                    if (data.data && data.data.length > 0) {
                        // Map through fetched candidates to add the Headshot URL
                        const fetchedCandidates: Candidate[] = data.data.map((candidate: any) => {
                            const headshotUrl = candidate.attributes.Headshot?.data?.attributes?.url
                                ? `https://pitne-voter-app-production.up.railway.app${candidate.attributes.Headshot.data.attributes.url}`
                                : undefined;
                            return {
                                ...candidate,
                                attributes: {
                                    ...candidate.attributes,
                                    PhotoURL: headshotUrl, // Add headshot URL to PhotoURL attribute
                                },
                            };
                        });
                        console.log("Fetched Candidates with Headshot URL:", fetchedCandidates);
                        setCandidates(fetchedCandidates);
                    } else {
                        console.warn("No candidate data available.");
                        setError("No candidate data available.");
                    }
                } else {
                    console.error('Failed to fetch candidate data', response.statusText);
                    setError('Failed to fetch candidate data');
                }
            } catch (fetchError) {
                console.error('Error:', fetchError);
                setError('An error occurred while fetching candidate data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCandidateData();
    }, []);

    console.log("Loading state:", isLoading);
    console.log("Candidates data:", candidates);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="candidate-profile">
            {candidates.length > 0 ? (
                candidates.map(candidate => (
                    <div key={candidate.id} className="candidate-card">
                        <h1>{candidate.attributes.Name}</h1>
                        {candidate.attributes.PhotoURL && (
                            <img src={candidate.attributes.PhotoURL} alt={candidate.attributes.Name} />
                        )}
                        <p><strong>District:</strong> {candidate.attributes.District}</p>
                        <p><strong>Party:</strong> {candidate.attributes.Party}</p>
                        <p><strong>Office Running For:</strong> {candidate.attributes.ElectionName}</p>
                        <p><strong>Bio:</strong> {candidate.attributes.Bio}</p>
                        
                        <div className="questionnaire-section">
                            <h2>Questionnaire</h2>
                            {Array.from({ length: 10 }).map((_, i) => {
                                const questionKey = `Question${i + 1}` as keyof Candidate['attributes'];
                                const answerKey = `Answer${i + 1}` as keyof Candidate['attributes'];
                                const question = candidate.attributes[questionKey];
                                const answer = candidate.attributes[answerKey];
                                return (
                                    question && answer ? (
                                        <div key={`q-${i}`}>
                                            <p><strong>{question}</strong></p>
                                            <p>{answer}</p>
                                        </div>
                                    ) : null 
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <p>No candidates available.</p>
            )}
        </div>
    );
}
