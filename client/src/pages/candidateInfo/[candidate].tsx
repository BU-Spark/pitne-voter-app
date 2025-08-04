import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CandidateAPI } from '@/common';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PartyAttributes {
  PartyName: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface CandidateAttributes {
  CampaignSiteLink: string | null;
  District: string;
  ElectionName: string;
  LinkedinLink: string | null;
  Name: string;
  party: {
    data: {
      attributes: PartyAttributes;
    } | null;
  };
  Role: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  Question1: string | null;
  Answer1: string | null;
  Question2: string | null;
  Answer2: string | null;
  Question3: string | null;
  Answer3: string | null;
  Question4: string | null;
  Answer4: string | null;
  Question5: string | null;
  Answer5: string | null;
  Headshot: {
    data: {
      attributes: {
        url: string;
      };
    } | null;
  };
  // New relational fields
  election_types?: { data: { attributes: { type: string; date?: string } }[] }; // Now includes dates
  office?: { data: { attributes: { office: string } } };
  political_affiliation?: { data: { attributes: { affiliation: string } } };
  district_relation?: { data: { attributes: { district: string } } };
  // Computed fields for display
  ElectionNames?: string[]; // Array of all election types
  ElectionDates?: string[]; // Array of all election dates
  ElectionTypesWithDates?: { type: string; date?: string }[]; // Combined election types and dates
  OfficeDisplay?: string; // Computed office display value
  PartyDisplay?: string; // Computed party display value
  DistrictDisplay?: string; // Computed district display value
}

interface CandidateDataObject {
  id: number;
  attributes: CandidateAttributes;
}

interface QuestionsAndAnswers {
  [key: string]: { question: string | null, answer: string | null };
}

const getStrapiMedia = (url: string | undefined | null) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://pitne-voter-app-production.up.railway.app';
  return `${baseUrl}${url}`;
};

export default function Candidate() {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState<string>('');
  const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([]);
  const [candidateData, setCandidateData] = useState<CandidateAttributes | null>(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionsAndAnswers>({});
  const [headshotUrl, setHeadshotUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const { candidate } = router.query;
    candidate && setCandidateName(candidate as string);
  }, [router.isReady, router.query]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(CandidateAPI + '?populate=party,Headshot,election_types,office,political_affiliation,district_relation', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = (await response.json()).data;
          setAllCandidateData(data);
        } else {
          console.error("Failed to fetch candidate data:", response.statusText);
        }
      } catch (e) {
        console.error("Error fetching candidate data:", e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (candidateName && allCandidateData.length > 0) {
      const normalizedInput = (input: string) => input.replace(/\s+/g, '').toLowerCase();
      const foundCandidateData = allCandidateData.find(candidate =>
        normalizedInput(candidate.attributes.Name) === normalizedInput(candidateName)
      );
      
      if (foundCandidateData) {
        const candidate = foundCandidateData.attributes;
        
        // Process new relational data for display
        const electionTypesWithDates = candidate.election_types?.data?.map((et: any) => ({
          type: et.attributes.type,
          date: et.attributes.date
        })) || [];
        
        const electionTypes = electionTypesWithDates.map(etd => etd.type);
        const electionDates = electionTypesWithDates.map(etd => etd.date).filter(date => date);
        
        const officeDisplay = candidate.office?.data?.attributes?.office || candidate.Role || 'N/A';
        const partyDisplay = candidate.political_affiliation?.data?.attributes?.affiliation 
          || candidate.party?.data?.attributes?.PartyName || 'N/A';
        const districtDisplay = candidate.district_relation?.data?.attributes?.district || candidate.District || 'N/A';
        
        // Create enhanced candidate data with computed fields
        const enhancedCandidateData = {
          ...candidate,
          ElectionNames: electionTypes,
          ElectionDates: electionDates,
          ElectionTypesWithDates: electionTypesWithDates,
          OfficeDisplay: officeDisplay,
          PartyDisplay: partyDisplay,
          DistrictDisplay: districtDisplay
        };
        
        setCandidateData(enhancedCandidateData);
      } else {
        setCandidateData(null);
      }
    }
  }, [allCandidateData, candidateName]);

  useEffect(() => {
    if (candidateData) {
      const qaMap = Object.entries(candidateData)
        .filter(([key]) => key.startsWith('Question') || key.startsWith('Answer'))
        .reduce<QuestionsAndAnswers>((acc, [key, value]) => {
          const questionIndex = key.match(/\d+/)?.[0];
          if (questionIndex) {
            if (!acc[questionIndex]) {
              acc[questionIndex] = { question: null, answer: null };
            }
            acc[questionIndex][key.includes('Question') ? 'question' : 'answer'] = value;
          }
          return acc;
        }, {});
      setQuestionsAndAnswers(qaMap);

      const rawUrl = candidateData.Headshot?.data?.attributes?.url;
      setHeadshotUrl(getStrapiMedia(rawUrl));
    } else {
      setQuestionsAndAnswers({});
      setHeadshotUrl(null);
    }
  }, [candidateData]);

  const getNameParts = (name: string | undefined | null): string[] => {
    return name ? name.split(' ') : [];
  };

  const nameParts = getNameParts(candidateData?.Name);

  return (
    <div className="relative flex flex-col bg-white min-h-screen pt-20">
      <div className="absolute top-20 left-5 z-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          aria-label="Go back"
        >
          <ArrowBackIcon />
        </button>
      </div>

      {candidateData ? (
        <div className="flex flex-col flex-grow p-6 md:p-10 lg:p-16">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-12 md:mb-16">
            {/* Headshot */}
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 lg:mr-16">
              {headshotUrl ? (
                <div
                  className="ml-40 bg-center bg-no-repeat bg-cover rounded-full items-center h-64 w-64 md:h-80 md:w-80 lg:h-80 lg:w-80 border border-gray-200"
                  style={{ backgroundImage: `url(${headshotUrl})` }}
                  role="img"
                  aria-label={`Headshot of ${candidateData?.Name || 'candidate'}`}
                />
              ) : (
                <div className="bg-gray-300 rounded-full h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Info Block */}
            <div className="flex-grow text-center md:text-left">
              {/* Candidate Name + Social Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-5">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-black leading-tight pt-10">
                  {nameParts[0]}
                  {nameParts.length > 1 && <br />}
                  {nameParts.slice(1).join(' ')}
                </h1>

                <div className="flex items-center pt-40 space-x-4">
                  {candidateData?.CampaignSiteLink && (
                    <a
                      href={candidateData.CampaignSiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Campaign Site"
                      className="text-gray-600 hover:text-black transition duration-200 pl-5 pr-5"
                    >
                      <Image
                        src="/Link.svg"
                        alt="Campaign Site Link"
                        width={32}
                        height={32}
                      />
                    </a>
                  )}
                  {candidateData?.LinkedinLink && (
                    <a
                      href={candidateData.LinkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn Profile"
                      className="text-gray-600 hover:text-black transition duration-200 bg-black rounded-md"
                    >
                      <Image
                        src="/Linkedin.svg"
                        alt="LinkedIn Link"
                        width={32}
                        height={32}
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Office, Party, District, and Election Info */}
              <div className="mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-start max-w-4xl">
                  
                  {/* Office */}
                  <div className="text-xl font-medium text-black border-b-2 border-black tracking-wide whitespace-nowrap">
                    OFFICE RUNNING FOR:
                  </div>
                  <div className="text-xl font-semibold text-black">
                    {candidateData?.OfficeDisplay}
                  </div>

                  {/* Party */}
                  <div className="text-xl font-medium text-red-600 tracking-wide whitespace-nowrap">
                    Affiliated Party:
                  </div>
                  <div className="text-xl font-semibold text-black uppercase">
                    {candidateData?.PartyDisplay}
                  </div>

                  {/* District */}
                  <div className="text-xl font-medium text-black tracking-wide whitespace-nowrap">
                    District:
                  </div>
                  <div className="text-xl font-semibold text-black">
                    {candidateData?.DistrictDisplay}
                  </div>

                  {/* Election Types */}
                  <div className="text-xl font-medium text-red-600 tracking-wide whitespace-nowrap">
                    Election Type{candidateData?.ElectionNames && candidateData?.ElectionNames.length > 1 ? 's' : ''}:
                  </div>
                  <div className="text-xl font-semibold text-black">
                    {candidateData?.ElectionNames && candidateData?.ElectionNames.length > 0 
                      ? candidateData.ElectionNames.join(', ') 
                      : candidateData?.ElectionName || 'N/A'
                    }
                  </div>

                  {/* Election Dates */}
                  <div className="text-xl font-medium text-black tracking-wide whitespace-nowrap">
                    Election Date{candidateData?.ElectionDates && candidateData?.ElectionDates.length > 1 ? 's' : ''}:
                  </div>
                  <div className="text-xl font-semibold text-black">
                    {candidateData?.ElectionDates && candidateData?.ElectionDates.length > 0 
                      ? candidateData.ElectionDates.map(date => {
                          if (!date) return 'N/A';
                          try {
                            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric', 
                              year: 'numeric'
                            });
                            return formattedDate;
                          } catch (error) {
                            return 'N/A';
                          }
                        }).join(', ')
                      : 'N/A'
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Questions and Answers Section */}
          {Object.keys(questionsAndAnswers).length > 0 && (
            <div className="w-full max-w-[1000px] mt-10 pl-40">
              <p className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                Questions curated by the Greater Boston News Bureau
              </p>
              <div className="space-y-3">
                {Object.entries(questionsAndAnswers).map(([index, qa]) =>
                  qa.question ? (
                    <Accordion
                      key={index}
                      elevation={0}
                      disableGutters
                      sx={{
                        backgroundColor: '#F2F2F2',
                        borderRadius: '8px',
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': { margin: 0, marginBottom: '12px' },
                        marginBottom: '12px',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<PlayArrowIcon sx={{ fontSize: '1.4rem', color: '#aaaaaa' }} />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        sx={{
                          paddingX: '16px',
                          paddingY: '12px',
                          minHeight: '48px',
                          '& .MuiAccordionSummary-content': { margin: 0 },
                          '&.Mui-expanded': { minHeight: '48px' },
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, color: '#333', fontSize: '1rem' }}>
                          {qa.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: '16px', backgroundColor: '#F7F7F7' }}>
                        {qa.answer ? (
                          <Typography sx={{ color: '#444', fontSize: '1rem' }}>
                            {qa.answer}
                          </Typography>
                        ) : (
                          <Typography sx={{ color: '#777', fontStyle: 'italic', fontSize: '1rem' }}>
                            No answer provided.
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-grow justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            {candidateName ? 'Loading candidate data...' : 'Candidate not specified'}
          </p>
        </div>
      )}
    </div>
  );
}
