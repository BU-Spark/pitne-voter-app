'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SubscribePopup from '../../components/subscribePopup/SubscribePopup';

interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Party?: { data: { attributes: { PartyName: string } } } | string; // Party can be nested or direct string
        ElectionName?: string; // ElectionName can be directly in attributes
        elections?: { data: [{ attributes: { ElectionName: string } }] }; // ElectionName can be nested in elections
        Office: string;
        Role?: string; // Role might be the office
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        PhotoURL?: string;
        [key: string]: any; // Allow other attributes, important for nested structures
        ElectionDate?: string;

    };
}

const parties = ['Democrat', 'Republican', 'Libertarian', 'Independent', 'Non Partisan', 'Other'];
const electionTypes = ['Federal Election', 'State Election', 'Municipal Election', 'Special Election', 'Primary Election', 'Ballot Questions/Referendum'];
const districts = [ 'District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9', 'First Suffolk District', 'Second Suffolk District', 'Third Suffolk District', 'Fourth Suffolk District', 'Fifth Suffolk District', 'Sixth Suffolk District', 'Seventh Suffolk District', 'Eighth Suffolk District', 'Ninth Suffolk District', 'Tenth Suffolk District', 'Eleventh Suffolk District', 'Twelfth Suffolk District', 'Thirteenth Suffolk District', 'Fourteenth Suffolk District', 'Fifteenth Suffolk District', 'Sixteenth Suffolk District', 'Seventeenth Suffolk District', 'Eighteenth Suffolk District', 'Nineteenth Suffolk District', 'Suffolk and Middlesex District', 'Middlesex and Suffolk District', 'Norfolk and Suffolk District', 'All District' ];
   // Example districts, replace with actual
/* Office Filters */
const federalOffices = [ 'President and Vice President', 'U.S. Senators', 'U.S. House Representatives' ];
const stateOffices = [ 'Governor', 'Lieutenant Governor', 'Attorney General', 'Secretary of the Commonwealth',
    'Treasurer and Receiver-General', 'Auditor', "Governor's Countcil", 'State Senators', 'State Representatives', ];
const municipalOffices = [ 'Mayor', 'City Councilors', 'School Committee Members'];
const otherOffices = ['Party State Committee Man', 'Party State Committee Woman', 'Delegate to the National Convention',
    'Alternate Delegate to the National Convention', 'District Attorney', 'Clerk of Courts', 'Clerk of Superior Court (Civil)',
    'Clerk of Superior Court (Criminal)', 'Clerk of Supreme Judicial Court', 'County Charter Commission',
    'Register of Deeds', 'Sheriff', 'County Treasurer', 'Probate Judge', 'Register of Probate', 'Council of Governments Executive Committee'
]

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
    const { electionType } = router.query;

    useEffect(() => {
        if (electionType) {
            setFilters(prevFilters => ({
                ...prevFilters,
                electionType: electionType as string, // Apply pre-filter for electionType
            }));
        }
    }, [electionType]);
    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await fetch('https://pitne-voter-app-production.up.railway.app/api/candidates?populate=Headshot,party,elections');

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.length > 0) {
                        const fetchedCandidates: Candidate[] = data.data.map((candidate: any) => {
                            const headshotUrl = candidate.attributes.Headshot?.data?.attributes?.url
                                ? `https://pitne-voter-app-production.up.railway.app${candidate.attributes.Headshot.data.attributes.url}`
                                : undefined;

                            // Correctly extract Party, ElectionName and Office based on API response structure
                            const partyName = candidate.attributes.party?.data?.attributes?.PartyName || candidate.attributes.Party; // Handle both nested and direct party
                            const electionName = candidate.attributes.elections?.data?.[0]?.attributes?.ElectionName || candidate.attributes.ElectionName; // Handle both nested and direct election
                            const office = candidate.attributes.Role || candidate.attributes.Office; // Use Role if Office is not present

                            return {
                                ...candidate,
                                attributes: {
                                    ...candidate.attributes,
                                    PhotoURL: headshotUrl,
                                    Party: partyName,
                                    ElectionName: electionName,
                                    Office: office,
                                    ElectionDate: candidate.attributes.ElectionDate // Make sure ElectionDate is mapped
                                },
                            };
                        });
                        setCandidates(fetchedCandidates);
                        setFilteredCandidates(fetchedCandidates);
                        console.log("Fetched Candidates Data:", fetchedCandidates); // Log to check API response
                    } else {
                        setError("No candidate data available.");
                    }
                } else {
                    setError('Failed to fetch candidate data');
                }
            } catch (error) {
                console.error("Fetch error:", error);
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
        // Ensure Party is treated as string for display
        const partyToDisplay = typeof candidate.attributes.Party === 'string' ? candidate.attributes.Party : candidate.attributes.Party?.data?.attributes?.PartyName;

        // Function to format the ElectionDate
        const formatDate = (dateString: string | undefined): string => {
            if (!dateString) {
                return 'N/A'; // Or handle null/undefined as needed
            }
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { // Format date for US locale (adjust as needed)
                    month: 'long', // e.g., "June"
                    day: 'numeric', // e.g., "21"
                    year: 'numeric', // e.g., "2024"
                });
            } catch (error) {
                console.error("Error formatting date:", error);
                return 'N/A'; // Return N/A if date parsing fails
            }
        };

        const formattedElectionDate = formatDate(candidate.attributes.ElectionDate);


        return (
            <div style={{ marginRight: '60px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '20px', padding: '15px', cursor: 'pointer', width: '90%',  backgroundColor: '#fff', transition: '0.3s', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {candidate.attributes.PhotoURL && (
                        <img src={candidate.attributes.PhotoURL} alt={candidate.attributes.Name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px', }} />
                        )}
                        <div>
                            {/* Display Party ABOVE the Name */}
                            <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{partyToDisplay}</span> {/* Party text is now red */}
                            <h3 style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>
                                {candidate.attributes.Name}
                            </h3>
                        </div>
                    </div>
            </div>
            {/* Expanded Section - Always Visible Now */}
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
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Election Date</p>
                  <strong style={{ fontSize: '14px' }}>{formattedElectionDate}</strong> {/* Use formatted date here */}
                </div>
              </div>


            {/* More Info Button */}
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button className = 'bg-transparent border border-red-600 text-red-600 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors duration-200'
                  
                  onClick={() => handleCandidateClick(candidate.attributes.Name)}
                >
                  More Info
                </button>
              </div>
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
            const partyName = typeof candidate.attributes.Party === 'string' ? candidate.attributes.Party : candidate.attributes.Party?.data?.attributes?.PartyName;

            const matchesParty = filters.party ? partyName === filters.party : true;
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
                <h2 style={{ color: '#F00', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: '700', lineHeight: '28px', letterSpacing: '0.1px', width: '390px', height: '28px', flexShrink: '0' }}>CANDIDATE INFO</h2>
                <hr className="border-t-6 border-black mb-4"/> {/* Added horizontal line here */}
                {/* Search Bar */}
                <div style={{ marginTop: '40px' }}>
                    <label htmlFor="search-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }} >Search Candidates: </label>
                    <input type="text" id="search-filter" name="search" placeholder="Enter candidate name here" value={filters.search} onChange={handleFilterChange} style={{ display: 'flex', height: '60px', alignItems: 'center', gap: '10px', borderRadius: '10px', background: '#FBFDFF', width: '100%', padding: '10px', border: '1px solid #ccc', }} />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="party-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: '#172554', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }}>Political Affiliation:</label>
                    <select id="party-filter" name="party" value={filters.party} onChange={handleFilterChange} style={{ width: '100%', display: 'flex', height: '60px', padding: '10px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF' }}><option value="">All</option>{parties.map(party => (<option key={party} value={party}>{party}</option>))}</select>
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
                    <select id="office-filter" name="office" value={filters.office} onChange={handleFilterChange} style={{ width: '100%', display: 'flex', height: '60px', padding: '10px', alignItems: 'center', gap: '10px', alignSelf: 'stretch', borderRadius: '10px', background: '#FBFDFF', }} > <option value="">All</option> <optgroup label="Federal Offices"> {federalOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup> <optgroup label="State Offices"> {stateOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup> <optgroup label="Municipal Offices"> {municipalOffices.map((office) => ( <option key={office} value={office}> {office} </option> ))} </optgroup><optgroup label="Other Offices"> {otherOffices.map((office) => (<option key={office} value={office}> {office} </option> ))}</optgroup> </select>
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
                        backgroundColor: '#F00',
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
                <h1 className="text-5xl font-extrabold">
                    <span className="text-red-600">CANDIDATE </span>
                    <span className="text-black">OVERVIEW</span>
                </h1>
                <p className="text-lg mt-4 font-medium text-gray-700 pb-10">
                    Review each candidate&apos;s background and priorities for <br />
                    Boston to make an informed decision this election cycle.
                </p>
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