/* Deeper candidate profiles that appear when their icon is clicked in the 
 * "What's on the Ballot" dropdown. Styles the entire deep profile page. Pulls
 * data from strapi "Candidates" content.
*/

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';
import { all } from 'axios';
import ButtonFillEx from '@/components/button/ButtonFillEx';
import { Accordion, AccordionDetails, AccordionSummary, Link, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CandidateAttributes {
    CampaignSiteLink: string | null;
    District: string;
    ElectionName: string;
    LinkedinLink: string | null;
    Name: string;
    Party: string;
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
}

interface CandidateDataObject {
    id: number;
    attributes: CandidateAttributes;
}

interface Candidate {
    attributes: CandidateAttributes;
}

interface QuestionsAndAnswers {
    [key: string]: { question: string | null, answer: string | null };
}

export default function Candidate() {
    const router = useRouter();


    const [candidateName, setCandidateName] = useState<string>('');
    const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([])
    const [candidateData, setCandidateData] = useState<CandidateAttributes | null>(null);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionsAndAnswers>({});

    useEffect(() => {
        if (!router.isReady) return;

        const { candidate } = router.query;
        candidate && setCandidateName(candidate as string);

    }, [router.isReady]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(localCandidateAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = (await response.json()).data;
                    setAllCandidateData(data)
                }
            } catch (e) {
                console.log(e);
            }
        };

        getData();

    }, []);

    useEffect(() => {
        if (candidateName && allCandidateData) {
            const normalizedInput = (input: string) => input.replace(/\s+/g, '').toLowerCase();
            const foundCandidateData = allCandidateData.find((candidateData: any) =>
                normalizedInput(candidateData.attributes.Name) === normalizedInput(candidateName)
            );
            if (foundCandidateData) {
                setCandidateData(foundCandidateData.attributes);
            } else {
                setCandidateData(null); // Handle case where candidate is not found
            }
        }

    }, [allCandidateData, candidateName]);

    useEffect(() => {
        console.log(candidateData);
    }, [candidateData])

    // Get filled out questions and answers and populate map
    useEffect(() => {
        if (candidateData) {
            const qaMap = Object.entries(candidateData)
                .filter(([key, value]) => key.startsWith('Question') || key.startsWith('Answer'))
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
        }
    }, [candidateData]);


    return (
        <div className="relative flex min-h-screen flex-col bg-[#d1e4fa] overflow-x-hidden">
            <div className="layout-container flex h-full flex-col">
                <header className="flex border-b border-solid border-b-white px-10 py-3"></header>
                <div className="flex mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-full bg-[#d1e4fa] text-blue-700 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] lg:w-auto"
                    >
                        <ArrowBackIcon className="mr-2" /> {/* Add some margin to the right */}
                        Go Back
                    </button>
                </div>
                {candidateData ? (
                    <>
                        <div className="px-40 flex flex-1 justify-center py-5">
                            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                                <div className="flex p-4">
                                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                                        <div className="flex gap-4">
                                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32" style={{ backgroundImage: 'url("Strapi.Image - PUT HERE")' }}></div> 
                                            <div className="flex flex-col justify-center">
                                                <h1 className="text-6xl pb-2 font-bold mb-2 justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{candidateData?.Name}</h1>
                                                <p className="text-blue-700 text-base text-xl font-6xl leading-normal">{candidateData?.Role}</p>
                                                <p className="text-blue-700 text-base text-xl font-6xl leading-normal">{candidateData?.Party}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                                    {candidateData.CampaignSiteLink && (
                                        <ButtonFillEx name='Campaign Site' link={candidateData.CampaignSiteLink} className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200' />
                                    )}
                                    {candidateData.LinkedinLink && (
                                        <ButtonFillEx name='Linkedin Link' link={candidateData.LinkedinLink} className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200' />
                                    )}
                                </div>
                                <h1 className="text-[#092020] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Questions curated by the founder, journalist Yawu Miller</h1>
                                <div className="flex flex-col p-4 gap-3">
                                    {Object.entries(questionsAndAnswers).length > 0 ? (
                                        Object.entries(questionsAndAnswers).map(([index, qa]) => (
                                            qa.question && qa.answer ? (
                                                <Accordion key={index} className='bg-[#effbfb] rounded-xl border border-[#c3efef]'>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                                        <Typography className='text-[#092020] text-sm font-medium'>{qa.question}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography className='text-[#2fb1b1] text-sm'>{qa.answer}</Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            ) : null
                                        ))
                                    ) : <p className="text-lg">Loading candidate data...</p>}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-lg">Loading candidate data...</p>
                )}
            </div>
        </div>
    );
}