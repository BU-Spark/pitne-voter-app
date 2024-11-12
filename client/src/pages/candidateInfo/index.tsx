'use client';
import React, { useEffect, useState } from 'react';
import SubscribePopup from '../../components/subscribePopup/SubscribePopup';


interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Party: string;
        ElectionName: string;
        Bio?: string;
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        PhotoURL?: string;
        [key: string]: string | undefined;
    };
}

// Component for Candidate Information Page
export default function CandidateInfo() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCandidateId, setExpandedCandidateId] = useState<number | null>(null); // State for managing expanded candidate
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchCandidateData = async () => {
            console.log("Fetching candidate data...");
            try {
                const response = await fetch('https://pitne-voter-app-production.up.railway.app/api/candidates?populate=Headshot');
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

        // Show popup after a delay (e.g., 1 seconds)
        const popupTimer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);

        // Cleanup timer when component unmounts
        return () => clearTimeout(popupTimer);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    console.log("Loading state:", isLoading);
    console.log("Candidates data:", candidates);

    const toggleExpand = (candidateId: number) => {
        setExpandedCandidateId(prevId => (prevId === candidateId ? null : candidateId)); // Toggle expand/collapse
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ paddingTop: '60px' }}> 
            {/* Header */}
            <div className="flex flex-row">
                <div className="flex flex-col items-left p-20 pl-20 pt-40 text-left bg-sky-50">
                    <div className="flex items-center">
                        <h1 className="text-blue-700 font-bold text-6xl bg-blue-700 bg-clip-text text-transparent">LEARN. PLAN.</h1>
                    </div>
                    <p className="font-semibold text-2xl pt-8">
                        Explore the election, candidates, and crucial
                        <br />
                        issues personalized to your community!
                    </p>
                </div>
            </div>

            <div className="candidate-profile px-20 pt-10">
                {candidates.length > 0 ? (
                    candidates.map(candidate => (
                        <div 
                            key={candidate.id} 
                            className="candidate-card" 
                            style={{ backgroundColor: 'White',
                                     boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.5)',
                                     border: '2px solid #ccc', 
                                     padding: '10px', 
                                     margin: '10px', 
                                     cursor: 'pointer', 
                                     borderRadius: '5px' }} 
                            onClick={() => toggleExpand(candidate.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ margin: 0 }}>{candidate.attributes.Name}</h2>
                                    <p style={{ margin: '5px 0' }}><strong>Party:</strong> {candidate.attributes.Party}</p>
                                </div>
                                {candidate.attributes.PhotoURL && (
                                    <img 
                                        src={candidate.attributes.PhotoURL} 
                                        alt={candidate.attributes.Name} 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} // Fixed size and object-fit for uniformity
                                    />
                                )}
                            </div>

                            {/* Expandable Details */}
                            {expandedCandidateId === candidate.id && (
                                <div className="candidate-details" style={{ marginTop: '10px' }}>
                                    <p><strong>District:</strong> {candidate.attributes.District}</p>
                                    <p><strong>Office Running For:</strong> {candidate.attributes.ElectionName}</p>
                                    <p><strong>Bio:</strong> {candidate.attributes.Bio}</p>

                                    <div className="questionnaire-section">
                                        <h3>Questionnaire</h3>
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
                            )}
                        </div>
                    ))
                ) : (
                    <p>No candidates available.</p>
                )}
            </div>

            {/* Subscribe Popup */}
            {showPopup && <SubscribePopup onClose={handleClosePopup} />}
        </div>
    );
}
