'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SubscribePopup from '../../components/subscribePopup/SubscribePopup';
import { DistrictsAPI, OfficesAPI, PoliticalAffiliationsAPI, ElectionTypesAPI } from '../../common';

interface Candidate {
    id: number;
    attributes: {
        Name: string;
        District: string;
        Role?: string; // Legacy field
        Office?: string; // Legacy field
        CampaignSiteLink?: string;
        LinkedInLink?: string;
        PhotoURL?: string;
        ElectionDate?: string; // Legacy single election date
        // New relational fields
        election_types?: { data: { attributes: { type: string; date?: string } }[] }; // Now supports multiple election types with dates
        office?: { data: { attributes: { office: string } } };
        political_affiliation?: { data: { attributes: { affiliation: string } } };
        district_relation?: { data: { attributes: { district: string } } };
        // Legacy fields for backward compatibility
        Party?: { data: { attributes: { PartyName: string } } } | string;
        ElectionName?: string;
        ElectionNames?: string[]; // New field to handle multiple election types
        ElectionDates?: string[]; // New field to handle multiple election dates
        ElectionTypesWithDates?: { type: string; date?: string }[]; // Combined election types and dates
        elections?: { data: [{ attributes: { ElectionName: string } }] };
        [key: string]: any;
    };
}

// Filter option interfaces
interface FilterOption {
    id: number;
    attributes: {
        district?: string;
        office?: string;
        affiliation?: string;
        type?: string;
    };
}

// Remove hardcoded arrays - these will be fetched from database
// const parties = ['Democrat', 'Republican', 'Libertarian', 'Independent', 'Non Partisan', 'Green Party', 'Other'];
// const electionTypes = ['Federal Election', 'State Election', 'Municipal Election', 'Special Election', 'Primary Election', 'Ballot Questions/Referendum'];
// const districts = [ 'District 1', 'District 2', ... ];
// const federalOffices = [ ... ];
// const stateOffices = [ ... ];
// const municipalOffices = [ ... ];
// const otherOffices = [ ... ];

// Remove hardcoded office to district mapping - this will be handled by database relations
// const officeToDistrictMap: Record<string, string[]> = { ... };
  
export default function CandidateInfo() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    
    // New state for filter options
    const [filterOptions, setFilterOptions] = useState({
        districts: [] as FilterOption[],
        offices: [] as FilterOption[],
        politicalAffiliations: [] as FilterOption[],
        electionTypes: [] as FilterOption[],
    });
    
    const [filters, setFilters] = useState({
        party: '',
        electionType: '',
        district: '',
        search: '', // New search bar for candidate name
        office: '', // New office filter
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 12;

    const router = useRouter();
    const { electionType } = router.query;

    // Fetch filter options from database
    const fetchFilterOptions = async () => {
        try {
            const [districtsRes, officesRes, politicalAffiliationsRes, electionTypesRes] = await Promise.all([
                fetch(DistrictsAPI + '?pagination[limit]=-1'),
                fetch(OfficesAPI + '?pagination[limit]=-1'),
                fetch(PoliticalAffiliationsAPI + '?pagination[limit]=-1'),
                fetch(ElectionTypesAPI + '?pagination[limit]=-1')
            ]);

            const [districtsData, officesData, politicalAffiliationsData, electionTypesData] = await Promise.all([
                districtsRes.json(),
                officesRes.json(),
                politicalAffiliationsRes.json(),
                electionTypesRes.json()
            ]);

            setFilterOptions({
                districts: districtsData.data || [],
                offices: officesData.data || [],
                politicalAffiliations: politicalAffiliationsData.data || [],
                electionTypes: electionTypesData.data || [],
            });
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };

    useEffect(() => {
        // Fetch filter options on component mount
        fetchFilterOptions();
    }, []);

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
                const response = await fetch('https://pitne-voter-app-production.up.railway.app/api/candidates?populate=Headshot,party,elections,election_types,office,political_affiliation,district_relation&pagination[limit]=-1');

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.length > 0) {
                        const fetchedCandidates: Candidate[] = data.data.map((candidate: any) => {
                            const headshotUrl = candidate.attributes.Headshot?.data?.attributes?.url
                                ? `https://pitne-voter-app-production.up.railway.app${candidate.attributes.Headshot.data.attributes.url}`
                                : undefined;

                            // Extract data from new relational fields with fallback to legacy fields
                            const partyName = candidate.attributes.political_affiliation?.data?.attributes?.affiliation 
                                || candidate.attributes.party?.data?.attributes?.PartyName 
                                || candidate.attributes.Party;
                            
                            // Handle multiple election types with dates
                            const electionTypesWithDates = candidate.attributes.election_types?.data?.map((et: any) => ({
                                type: et.attributes.type,
                                date: et.attributes.date
                            })) || [];
                            
                            const electionTypes = electionTypesWithDates.map((etd: any) => etd.type);
                            const electionDates = electionTypesWithDates.map((etd: any) => etd.date).filter((date: any) => date);
                            
                            const electionName = electionTypes[0] // Use first election type for legacy ElectionName field
                                || candidate.attributes.elections?.data?.[0]?.attributes?.ElectionName 
                                || candidate.attributes.ElectionName;
                            
                            // Use first election date from relational data, fallback to legacy field
                            const primaryElectionDate = electionDates[0] || candidate.attributes.ElectionDate;
                            
                            const office = candidate.attributes.office?.data?.attributes?.office
                                || candidate.attributes.Role 
                                || candidate.attributes.Office;
                            
                            const district = candidate.attributes.district_relation?.data?.attributes?.district
                                || candidate.attributes.District;

                            return {
                                ...candidate,
                                attributes: {
                                    ...candidate.attributes,
                                    PhotoURL: headshotUrl,
                                    Party: partyName,
                                    ElectionName: electionName,
                                    ElectionNames: electionTypes, // Array of all election types
                                    ElectionDates: electionDates, // Array of all election dates
                                    ElectionTypesWithDates: electionTypesWithDates, // Combined election types and dates
                                    Office: office,
                                    District: district,
                                    ElectionDate: primaryElectionDate // Primary election date from relational data or legacy field
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            search: value,
        }));
        setCurrentPage(1); // Reset to first page when searching
    };

    // Pagination calculations
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
    const startIndex = (currentPage - 1) * candidatesPerPage;
    const endIndex = startIndex + candidatesPerPage;
    const currentPageCandidates = filteredCandidates.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of candidates section
        window.scrollTo({ top: 100, behavior: 'smooth' });
    };

    /* Dropdown candidates info*/
    const CandidatePreview: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
        const [imageLoaded, setImageLoaded] = useState(false);
        const [imageError, setImageError] = useState(false);
        
        // Reset image states when candidate changes
        useEffect(() => {
            setImageLoaded(false);
            setImageError(false);
        }, [candidate.attributes.PhotoURL]);

        const handleImageLoad = () => {
            setImageLoaded(true);
            setImageError(false);
        };

        const handleImageError = () => {
            setImageError(true);
            setImageLoaded(false);
        };

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

        // Format election dates from relational data
        const formatElectionDates = (): string => {
            // If we have multiple election dates from relational data, format them
            if (candidate.attributes.ElectionDates && candidate.attributes.ElectionDates.length > 0) {
                const formattedDates = candidate.attributes.ElectionDates.map(date => formatDate(date)).filter(date => date !== 'N/A');
                if (formattedDates.length > 0) {
                    return formattedDates.join(', ');
                }
            }
            // Fallback to legacy ElectionDate field
            return formatDate(candidate.attributes.ElectionDate);
        };

        const formattedElectionDate = formatElectionDates();



        

        return (
            <div style={{ 
                border: '1px solid #ccc', 
                borderRadius: '20px', 
                padding: '15px', 
                cursor: 'pointer', 
                backgroundColor: '#fff', 
                transition: '0.3s', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                height: 'fit-content'
            }}>
                {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '60px', marginRight: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                            {candidate.attributes.PhotoURL && !imageError ? (
                                <img 
                                    src={candidate.attributes.PhotoURL} 
                                    alt={candidate.attributes.Name}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        display: imageError ? 'none' : 'block'
                                    }} 
                                />
                            ) : null}
                            {(!candidate.attributes.PhotoURL || imageError) && (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#999"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div>
                            {/* Display Party ABOVE the Name */}
                            <span style={{ color: 'red', fontSize: '14px', display: 'block' }}>{partyToDisplay}</span>
                            <h3 style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>
                                {candidate.attributes.Name}
                            </h3>
                        </div>
                    </div>
                </div>
                
                {/* Expanded Section - Now with 2 columns since 2 items were removed */}
                <div style={{ 
                    marginTop: '10px', 
                    paddingTop: '20px', 
                    borderTop: '1px solid #ddd', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '15px', 
                    textAlign: 'center' 
                }}>
                    <div>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Office</p>
                        <strong style={{ fontSize: '16px' }}>{candidate.attributes.Office}</strong>
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>District</p>
                        <strong style={{ fontSize: '16px' }}>{candidate.attributes.District}</strong>
                    </div>
                </div>

                {/* More Info Button */}
                <div style={{ textAlign: 'right', marginTop: '15px' }}>
                    <button className='bg-transparent border border-red-600 text-red-600 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors duration-200'
                        onClick={() => handleCandidateClick(candidate.attributes.Name)}>
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
        setCurrentPage(1);
    };

    useEffect(() => {
        const filtered = candidates.filter(candidate => {
            // Extract values from mapped attributes (handles both new relational and legacy data)
            const partyName = candidate.attributes.Party;
            const electionNames = candidate.attributes.ElectionNames || []; // Array of election types
            const electionName = candidate.attributes.ElectionName; // Legacy single election name
            const office = candidate.attributes.Office;
            const district = candidate.attributes.District;
            const candidateName = candidate.attributes.Name;

            // Apply filters
            const matchesParty = filters.party ? partyName === filters.party : true;
            
            // Check if candidate matches election type filter (check both array and legacy field)
            const matchesElection = filters.electionType ? 
                (electionNames.includes(filters.electionType) || electionName === filters.electionType) : true;
            
            const matchesDistrict = filters.district ? district === filters.district : true;
            const matchesSearch = filters.search ? candidateName.toLowerCase().includes(filters.search.toLowerCase()) : true;
            const matchesOffice = filters.office ? office === filters.office : true;

            return matchesParty && matchesElection && matchesDistrict && matchesSearch && matchesOffice;
        });
        setFilteredCandidates(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, candidates]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: '100px', paddingLeft: '30px', paddingRight: '30px', gap: '20px' }}>
            {/* Sidebar for Filters */}
            <div style={{ flex: '1 1 300px', maxWidth: '400px', padding: '20px', backgroundColor: 'transparent', width: '100%' }}>
                <h2 style={{ color: '#F00', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: '700', lineHeight: '28px', letterSpacing: '0.1px', width: '390px', height: '28px', flexShrink: '0' }}>CANDIDATE INFO</h2>
                <hr className="border-t-6 border-black mb-4"/> {/* Added horizontal line here */}
                {/* Search Bar */}
                <div style={{ marginTop: '40px' }}>
                    <label htmlFor="search-filter" style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: 'black', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px' }} >Search Candidates: </label>
                    <input type="text" id="search-filter" name="search" placeholder="Enter candidate name here" value={filters.search} onChange={handleSearchChange} style={{ display: 'flex', height: '60px', alignItems: 'center', gap: '10px', borderRadius: '10px', background: '#FBFDFF', width: '100%', padding: '10px', border: '1px solid #ccc', }} />
                </div>

                

                {/* Office Filter */}
                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: 'black', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px', marginBottom: '10px' }}>
                        Office:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {filterOptions.offices.map((office) => {
                            const isSelected = filters.office === office.attributes.office;
                            return (
                                <div
                                    key={office.id}
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            office: isSelected ? '' : office.attributes.office || ''
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '20px',
                                        border: isSelected ? '2px solid #F00' : '1px solid #ccc',
                                        backgroundColor: isSelected ? '#FFF5F5' : '#FBFDFF',
                                        color: isSelected ? '#F00' : '#333',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: isSelected ? '600' : '400',
                                        transition: 'all 0.2s ease',
                                        userSelect: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#FBFDFF';
                                        }
                                    }}
                                >
                                    <span>{office.attributes.office}</span>
                                    {isSelected && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFilters(prev => ({ ...prev, office: '' }));
                                            }}
                                            style={{
                                                marginLeft: '8px',
                                                background: 'none',
                                                border: 'none',
                                                color: '#F00',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                lineHeight: '1',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: 'black', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px', marginBottom: '10px' }}>
                        District:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {filterOptions.districts.map((district) => {
                            const isSelected = filters.district === district.attributes.district;
                            return (
                                <div
                                    key={district.id}
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            district: isSelected ? '' : district.attributes.district || ''
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '20px',
                                        border: isSelected ? '2px solid #F00' : '1px solid #ccc',
                                        backgroundColor: isSelected ? '#FFF5F5' : '#FBFDFF',
                                        color: isSelected ? '#F00' : '#333',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: isSelected ? '600' : '400',
                                        transition: 'all 0.2s ease',
                                        userSelect: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#FBFDFF';
                                        }
                                    }}
                                >
                                    <span>{district.attributes.district}</span>
                                    {isSelected && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFilters(prev => ({ ...prev, district: '' }));
                                            }}
                                            style={{
                                                marginLeft: '8px',
                                                background: 'none',
                                                border: 'none',
                                                color: '#F00',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                lineHeight: '1',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'flex', height: '26px', flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch', color: 'black', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: '700', lineHeight: '24px', letterSpacing: '0.15px', marginBottom: '10px' }}>
                        Political Affiliation:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {filterOptions.politicalAffiliations.map((affiliation) => {
                            const isSelected = filters.party === affiliation.attributes.affiliation;
                            return (
                                <div
                                    key={affiliation.id}
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            party: isSelected ? '' : affiliation.attributes.affiliation || ''
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '20px',
                                        border: isSelected ? '2px solid #F00' : '1px solid #ccc',
                                        backgroundColor: isSelected ? '#FFF5F5' : '#FBFDFF',
                                        color: isSelected ? '#F00' : '#333',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: isSelected ? '600' : '400',
                                        transition: 'all 0.2s ease',
                                        userSelect: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = '#FBFDFF';
                                        }
                                    }}
                                >
                                    <span>{affiliation.attributes.affiliation}</span>
                                    {isSelected && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFilters(prev => ({ ...prev, party: '' }));
                                            }}
                                            style={{
                                                marginLeft: '8px',
                                                background: 'none',
                                                border: 'none',
                                                color: '#F00',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                lineHeight: '1',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
            <div style={{ flex: '2 1 600px', padding: '20px', width: '100%' }}>
                <h1 className="text-5xl font-extrabold">
                    <span className="text-red-600">CANDIDATE </span>
                    <span className="text-black">OVERVIEW</span>
                </h1>
                <p className="text-lg mt-4 font-medium text-gray-700 pb-6">
                    Review each candidate&apos;s background and priorities for <br />
                    Boston to make an informed decision this election cycle.
                </p>
                
                {filteredCandidates.length > 0 ? (
                    <>
                        {/* Results count and pagination info */}
                        <div style={{ marginBottom: '20px', color: '#666', fontSize: '16px' }}>
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredCandidates.length)} of {filteredCandidates.length} candidates
                        </div>
                        
                        {/* Candidates grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '20px',
                            width: '100%',
                            maxWidth: '1020px', // 320px * 3 + 20px * 2 = 1000px + some padding
                            justifyContent: 'start', // Left align the grid
                            marginBottom: '40px'
                        }}>
                            {currentPageCandidates.map(candidate => (
                                <CandidatePreview key={candidate.id} candidate={candidate} />
                            ))}
                        </div>
                        
                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '30px',
                                flexWrap: 'wrap'
                            }}>
                                {/* Previous button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                                        color: currentPage === 1 ? '#999' : '#333',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Previous
                                </button>
                                
                                {/* Page numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        style={{
                                            padding: '8px 12px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            backgroundColor: currentPage === page ? '#F00' : '#fff',
                                            color: currentPage === page ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: currentPage === page ? '600' : '400'
                                        }}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                {/* Next button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                                        color: currentPage === totalPages ? '#999' : '#333',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>No candidates match the selected filters.</p>
                )}
            </div>


            {/* Subscribe Popup */}
            {showPopup && <SubscribePopup onClose={handleClosePopup} />}


        </div>
    );
}