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
    Headshot: {
        data: {
            attributes: {
                url: string
            }
        }

    }
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


    // Get candidate name from URL
    useEffect(() => {
        if (!router.isReady) return;

        const { candidate } = router.query;
        candidate && setCandidateName(candidate as string);

    }, [router.isReady, router.query]);


    // Get candidate data from strapi
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(deployedCandidateAPI + '?populate=*', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = (await response.json()).data;
                    setAllCandidateData(data)
                    console.log(data)
                }


            } catch (e) {
                console.log(e);
            }
        };

        getData();

    }, []);


    // Set the candidate data
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
        console.log(candidateData?.Headshot.data.attributes.url)
    }, [candidateData])


    // Get filled out questions and answers from strapi and populate map
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
        <>
            <header className="flex border-b border-solid border-b-white px-10 py-3"></header>

            {/* Go Back button */}
            <div className="mt-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-full bg-[#d1e4fa] text-blue-700 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] max-w-[480px] lg:w-auto"
                >
                    <ArrowBackIcon className="mr-4" />
                    Go Back
                </button>
            </div>


            {/* Actual candidate data */}
            <div className="relative flex min-h-screen flex-col bg-[#d1e4fa] overflow-x-hidden justify-center">
            {candidateData ? (
                <div className="lg:px-36 px-10 flex flex-1 justify-center pb-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="grid grid-cols-1 py-4">
                            <div className="flex justify-center p-4 md:col-span-3">

                                <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                                    <div className="flex gap-4 flex-col md:flex-row">
                                        {/* Candidate image */}
                                        <div className="flex justify-center items-center h-full">
                                            <div
                                                className="bg-center bg-no-repeat bg-cover rounded-full h-64 w-64 lg:h-80 lg:w-80 mx-6"
                                                style={{
                                                    backgroundImage: `url(https://pitne-voter-app-production.up.railway.app${candidateData?.Headshot.data.attributes.url})`,
                                                }}
                                            ></div>
                                        </div>
                                        {/* Name, role, party */}
                                        <div className="flex flex-col justify-center text-center lg:text-left md:text-left">
                                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                {candidateData?.Name}
                                            </h1>
                                            <p className="text-blue-700 text-xl md:text-2xl leading-normal">
                                                {candidateData?.Role}
                                            </p>
                                            <p className="text-blue-700 text-xl md:text-2xl leading-normal">
                                                {candidateData?.Party}
                                            </p>


                                            {/* Links */}
                                            <div className="flex flex-row items-center justify-center lg:justify-normal md:justify-normal pt-4 text-center md:col-span-1">
                                                {candidateData.CampaignSiteLink && (
                                                    <ButtonFillEx
                                                        name="Campaign Site"
                                                        link={candidateData.CampaignSiteLink}
                                                        className="p-4 mr-2 xl:my-2 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200"
                                                    />
                                                )}
                                                {candidateData.LinkedinLink && (
                                                    <ButtonFillEx
                                                        name="Linkedin"
                                                        link={candidateData.LinkedinLink}
                                                        className="p-4 ml-2 xl:my-2 rounded-full bg-white text-blue-700 border-blue-800 hover:bg-gray-200"
                                                    />
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Questions and Answers */}
                        <div className="flex flex-col justify-center items-center py-8 my-2">
                            <p className="text-4xl font-semibold mb-8 text-center">Questions curated by the founder, journalist Yawu Miller</p>
                            {Object.entries(questionsAndAnswers).map(([index, qa]) => (
                                qa.question && qa.answer ? (
                                    <Accordion key={index} className='bg-white w-full lg:w-3/4 md:w-3/4 mb-3 rounded-md'>

                                        {/* Question */}
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                            <Typography className='text-blue-700 text-xl'>{qa.question}</Typography>
                                        </AccordionSummary>

                                        {/* Answer */}
                                        <AccordionDetails>
                                            <Typography className='mb-8 text-xl text-center'>{qa.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            ) : (null)}
            </div>
        </>
    );
}