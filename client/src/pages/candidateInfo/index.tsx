'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SubscribePopup from '../../components/subscribePopup/SubscribePopup';

interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Party: string;
        ElectionName: string;
        Office: string;
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

export default function CandidateInfo() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [filters, setFilters] = useState({
        party: '',
        electionType: '',
        district: '',
    });

    const router = useRouter();

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await fetch('https://pitne-voter-app-production.up.railway.app/api/candidates?populate=Headshot');

                if (response.ok) {
                    const data = await response.json();
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
                        setCandidates(fetchedCandidates);
                        setFilteredCandidates(fetchedCandidates);
                    } else {
                        setError("No candidate data available.");
                    }
                } else {
                    setError('Failed to fetch candidate data');
                }
            } catch {
                setError('An error occurred while fetching candidate data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCandidateData();


        // Show popup after a delay (e.g., 10 seconds)
        const popupTimer = setTimeout(() => {
            setShowPopup(true);
        }, 10000);

        // Cleanup timer when component unmounts
        return () => clearTimeout(popupTimer);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };


    const handleCandidateClick = (name: string) => {
        const formattedName = name.replace(/\s+/g, '').toLowerCase(); // Ensure it matches profile URL structure
        router.push(`/candidateInfo/${formattedName}`); // Navigate to the candidate's profile page
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            party: '',
            electionType: '',
            district: '',
        });
    };

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
        <div style={{ display: 'flex', paddingTop: '120px', paddingLeft: '60px' }}>
            {/* Sidebar for Filters */}
            <div style={{ width: '25%', padding: '20px', backgroundColor: 'transparent' }}>
                <h2 style={{ color: '#1D4ED8', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: '700', lineHeight: '28px', letterSpacing: '0.1px', width: '390px', height: '28px', flexShrink: '0' }}>Filter Candidates</h2>
                <div>
                    <label htmlFor="party-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', paddingTop: '30px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>Political Affiliation:</label>
                    <select id="party-filter" name="party" value={filters.party} onChange={handleFilterChange} style={{ display: 'flex', height: '60px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF', width: '100%' }}><option value="">All</option>{parties.map(party => (<option key={party} value={party}>{party}</option>))}</select>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="election-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>Election Type:</label>
                    <select id="election-filter" name="electionType" value={filters.electionType} onChange={handleFilterChange} style={{ width: '100%', display: 'flex', height: '60px', padding: '10px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF' }}>
                        <option value="">All</option>
                        {electionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="district-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>District:</label>
                    <select id="district-filter" name="district" value={filters.district} onChange={handleFilterChange} style={{ width: '100%', display: 'flex', height: '60px', padding: '10px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF' }}>
                        <option value="">All</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                {/* Reset Filters Button */}
                <button
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                    onClick={handleResetFilters}
                >
                    Reset Filters
                </button>
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
                                borderRadius: '5px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {candidate.attributes.PhotoURL && (
                                        <img
                                            src={candidate.attributes.PhotoURL}
                                            alt={candidate.attributes.Name}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
                                        />
                                    )}
                                    <div>
                                        <h2 style={{ margin: 0, fontWeight: 'bold' }}>{candidate.attributes.Name}</h2>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>Party:</strong> {candidate.attributes.Party}
                                            </p>
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>Office:</strong> {candidate.attributes.Role}
                                            </p>
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>Election:</strong> {candidate.attributes.ElectionName}
                                            </p>
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>District:</strong> {candidate.attributes.District}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleCandidateClick(candidate.attributes.Name)}
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No candidates match the selected filters.</p>
                )}
            </div>


            {/* Subscribe Popup */}
            {showPopup && <SubscribePopup onClose={handleClosePopup} />}


        </div>
    );
}
