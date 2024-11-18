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
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        PhotoURL?: string;
        [key: string]: string | undefined;
    };
}

const parties = ['Democrat', 'Republican', 'Independent', 'Non Partisan', 'Other'];
const electionTypes = ['Federal Election', 'State Election', 'Municipal Election', 'Special Election', 'Primary Election', 'Ballot Questions/Referendum'];
const districts = ['District 1', 'District 2', 'District 3', 'District 4']; // Example districts, replace with actual

// Component for Candidate Information Page
export default function CandidateInfo() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCandidateId, setExpandedCandidateId] = useState<number | null>(null);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [filters, setFilters] = useState({
        party: '',
        electionType: '',
        district: '',
    });

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
                        const fetchedCandidates: Candidate[] = data.data.map((candidate: any) => {
                            const headshotUrl = candidate.attributes.Headshot?.data?.attributes?.url
                                ? `https://pitne-voter-app-production.up.railway.app${candidate.attributes.Headshot.data.attributes.url}`
                                : undefined;
                            return {
                                ...candidate,
                                attributes: {
                                    ...candidate.attributes,
                                    PhotoURL: headshotUrl,
                                },
                            };
                        });
                        console.log("Fetched Candidates with Headshot URL:", fetchedCandidates);
                        setCandidates(fetchedCandidates);
                        setFilteredCandidates(fetchedCandidates); // Set initial filtered candidates
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

    const toggleExpand = (candidateId: number) => {
        setExpandedCandidateId(prevId => (prevId === candidateId ? null : candidateId));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Filter candidates based on selected filters
    useEffect(() => {
        const filtered = candidates.filter(candidate => {
            const matchesParty = filters.party ? candidate.attributes.Party === filters.party : true;
            const matchesElection = filters.electionType ? candidate.attributes.ElectionName === filters.electionType : true;
            const matchesDistrict = filters.district ? candidate.attributes.District === filters.district : true;
            return matchesParty && matchesElection && matchesDistrict;
        });
        setFilteredCandidates(filtered);
    }, [filters, candidates]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ display: 'flex', paddingTop: '60px' }}>
            {/* Sidebar for Filters */}
            <div style={{ width: '25%', padding: '20px', backgroundColor: '#f0f0f0', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
                <h2>Filter Candidates</h2>
                
                <div>
                    <label htmlFor="party-filter">Political Affiliation:</label>
                    <select id="party-filter" name="party" value={filters.party} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {parties.map(party => (
                            <option key={party} value={party}>{party}</option>
                        ))}
                    </select>
                </div>
                
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="election-filter">Election Type:</label>
                    <select id="election-filter" name="electionType" value={filters.electionType} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {electionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="district-filter">District:</label>
                    <select id="district-filter" name="district" value={filters.district} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ width: '75%', padding: '20px' }}>
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                        <div 
                            key={candidate.id} 
                            className="candidate-card" 
                            style={{ 
                                backgroundColor: 'White',
                                boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.5)',
                                border: '2px solid #ccc', 
                                padding: '10px', 
                                margin: '10px', 
                                cursor: 'pointer', 
                                borderRadius: '5px',
                            }} 
                            onClick={() => toggleExpand(candidate.id)}
                        >
                            {/* Candidate Card Layout */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {candidate.attributes.PhotoURL && (
                                        <img 
                                            src={candidate.attributes.PhotoURL} 
                                            alt={candidate.attributes.Name} 
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
                                        />
                                    )}
                                    <div>
                                        <h2 style={{ margin: 0 }}>{candidate.attributes.Name}</h2>
                                        <p style={{ margin: '5px 0' }}><strong>Party:</strong> {candidate.attributes.Party}</p>
                                        <p style={{ margin: '5px 0' }}><strong>Election:</strong> {candidate.attributes.ElectionName}</p>
                                    </div>
                                </div>
                                {/* Arrow Icon */}
                                <div style={{ fontSize: '20px', marginLeft: '10px' }}>
                                    ▼
                                </div>
                            </div>

                            {/* Expandable Details */}
                            {expandedCandidateId === candidate.id && (
                                <div className="candidate-details" style={{ marginTop: '10px', padding: '10px', borderTop: '1px solid #ccc' }}>
                                    <p><strong>District:</strong> {candidate.attributes.District}</p>
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
        </div>
    );
}
