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
        ElectionDate?: string;
    };
}

const parties = ['Democrat', 'Republican', 'Independent', 'Non Partisan', 'Other'];
const electionTypes = ['Federal Election', 'State Election', 'Municipal Election', 'Special Election', 'Primary Election', 'Ballot Questions/Referendum'];
const districts = ['District 1', 'District 2', 'District 3', 'District 4']; // Example districts, replace with actual
/* Office Filters */
const federalOffices = [ 'President and Vice President', 'U.S. Senators', 'U.S. House Representatives', ];
const stateOffices = [ 'Governor and Lieutenant Governor', 'Attorney General', 'Secretary of the Commonwealth', 'Treasurer and Receiver-General', 'Auditor', 'State Senators', 'State Representatives', ];
const municipalOffices = [ 'Mayor', 'City Councilors', 'School Committee Members', ];

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
        search: '', // New search bar for candidate name
        office: '', // New office filter
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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    /* Dropdown candidates info*/
    const CandidatePreview: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
        const [expanded, setExpanded] = useState(false);
        const toggleExpanded = (e: React.MouseEvent) => {
          // Prevent any parent handlers from being triggered
          e.stopPropagation();
          setExpanded((prev) => !prev);
        };
      
        return (
            <div onClick={toggleExpanded} style={{ marginRight: '60px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '20px', padding: '15px', cursor: 'pointer', width: '90%',  backgroundColor: '#fff', transition: '0.3s', boxShadow: expanded ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : '0px 2px 4px rgba(0, 0, 0, 0.1)', }}> 
            {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {candidate.attributes.PhotoURL && (
                        <img src={candidate.attributes.PhotoURL} alt={candidate.attributes.Name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px', }} />
                        )}
                        <div>
                            <span style={{ color: '#555', fontSize: '14px' }}>{candidate.attributes.Party}</span>
                            <h3 style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>
                                {candidate.attributes.Name}
                            </h3>
                        </div>
                    </div>
      
              {/* Expand/Collapse Indicator */}
              <span style={{ fontSize: '20px', color: '#888' }}>{expanded ? '▲' : '▼'}</span>
            </div>
            {/* Expanded Section */}
            {expanded && (
              <div style={{ marginTop: '10px', paddingTop: '40px', borderTop: '1px solid #ddd', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', }} >
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Office</p>
                  <strong style={{ fontSize: '14px' }}>{candidate.attributes.Office}</strong>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>District</p>
                  <strong style={{ fontSize: '14px' }}>{candidate.attributes.District}</strong>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Election</p>
                  <strong style={{ fontSize: '14px' }}>{candidate.attributes.ElectionName}</strong>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Date</p>
                  <strong style={{ fontSize: '14px' }}>{candidate.attributes.ElectionDate || 'N/A'}</strong>
                </div>
              </div>
            )}
      
            {/* More Info Button */}
            {expanded && (
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #007bff',
                    color: '#007bff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCandidateClick(candidate.attributes.Name)}
                >
                  More Info
                </button>
              </div>
            )}
          </div>
        );
      };
    
    const handleResetFilters = () => {
        setFilters({
            party: '',
            electionType: '',
            district: '',
            search: '', // New search bar for candidate name
            office: '', // New office filter
        });
    };

    useEffect(() => {
        const filtered = candidates.filter(candidate => {
            const matchesParty = filters.party ? candidate.attributes.Party === filters.party : true;
            const matchesElection = filters.electionType ? candidate.attributes.ElectionName === filters.electionType : true;
            const matchesDistrict = filters.district ? candidate.attributes.District === filters.district : true;
            const matchesSearch = filters.search ? candidate.attributes.Name.toLowerCase().includes(filters.search.toLowerCase()): true;    // New Seach filter for candidates
            const matchesOffice = filters.office ? candidate.attributes.Office === filters.office : true;                                   // New Office filter
            
            return matchesParty && matchesElection && matchesDistrict && matchesSearch && matchesOffice;
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
                {/* Search Bar */}
                <div style={{ marginTop: '40px' }}>
                    <label htmlFor="search-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }} >Search Candidates: </label>
                    <input type="text" id="search-filter" name="search" placeholder="Enter candidate name here" value={filters.search} onChange={handleFilterChange} style={{ display: 'flex', height: '60px', alignItems: 'center', gap: '10px', borderRadius: '10px', background: '#FBFDFF', width: '100%', padding: '10px', border: '1px solid #ccc', }} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="party-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>Political Affiliation:</label>
                    <select id="party-filter" name="party" value={filters.party} onChange={handleFilterChange} style={{ display: 'flex', height: '60px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF', width: '100%' }}><option value="">All</option>{parties.map(party => (<option key={party} value={party}>{party}</option>))}</select>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="election-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>Election Type:</label>
                    <select id="election-filter" name="electionType" value={filters.electionType} onChange={handleFilterChange} style={{ width: '100%', display: 'flex', height: '60px', padding: '10px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF' }}>
                        <option value="">All</option>
                        {electionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                {/* Office Filter */}
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="office-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px', }} > Office: </label>
                    <select id="office-filter" name="office" value={filters.office} onChange={handleFilterChange} style={{ height: '60px', borderRadius: '10px', background: '#FBFDFF', width: '100%', padding: '10px', border: '1px solid #ccc', }} > <option value="">All</option> <optgroup label="Federal Offices"> {federalOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup> <optgroup label="State Offices"> {stateOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup> <optgroup label="Municipal Offices"> {municipalOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup> </select>
                </div>

                <div style={{ marginTop: '20px' }}>
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
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1D4ED8', marginBottom: '20px', textAlign: 'left' }}>
                    Candidate Overview
                </h2>
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                    <CandidatePreview key={candidate.id} candidate={candidate} />
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
}
