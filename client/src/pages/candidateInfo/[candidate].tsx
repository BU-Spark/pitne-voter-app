/* candidate profiles that appear when their icon is clicked on candidate info page.
 Pulls data from strapi "Candidates" content.
*/

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CandidateAPI } from '@/common';
import ButtonFillEx from '@/components/button/ButtonFillEx';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    Biography: string | null;
    Headshot: {
        data: {
            attributes: {
                url: string;
            };
        };
    };
}

interface CandidateDataObject {
    id: number;
    attributes: CandidateAttributes;
}

interface QuestionsAndAnswers {
    [key: string]: { question: string | null, answer: string | null };
}

export default function Candidate() {
    const router = useRouter();
    const [candidateName, setCandidateName] = useState<string>('');
    const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([]);
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
                const response = await fetch(CandidateAPI + '?populate=*', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = (await response.json()).data;
                    setAllCandidateData(data);
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
                setCandidateData(null);
            }
        }
    }, [allCandidateData, candidateName]);

    // Get filled out questions and answers
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
            {/* Actual candidate data */}
            <div className="relative flex flex-col bg-white">
                <div className="mt-20 m-10">
                    {/* Go Back button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-full bg-white text-blue-700 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] max-w-[480px] lg:w-auto bg-transparent hover:bg-blue-200"
                    >
                        <ArrowBackIcon className="mr-4" />
                    </button>
                </div>
                {candidateData ? (
                    <div className="layout-content-container flex flex-col flex-1 bg-white rounded">
                        <div className="grid grid-cols-1">
                            {/* Candidate Image, Name, and Office Container */}
                            <div className="flex justify-start lg:p-4 md:p-4 sm:p-4 md:col-span-3">
                                {/* Candidate Info and Image Container*/}
                                <div className="flex gap-4 flex-col md:flex-row justify-between items-start w-full">
                                    {/* Name, role, party - Left side */}
                                    <div className="flex flex-col md:w-[40%] ml-20">
                                        <h1 className="pb-2 pt-20 text-4xl md:text-5xl lg:text-7xl font-bold mb-4 bg-blue-950 bg-clip-text text-transparent">
                                            {candidateData?.Name?.split(' ').map((part, i) => (
                                                <span key={i}>
                                                    {i > 0 && <br />}
                                                    {part}
                                                </span>
                                            ))}
                                        </h1>
                                        <div className="flex flex-row items-baseline gap-8">
                                            <div className="flex flex-row">
                                                <div className="flex items-baseline flex-col">
                                                    <p className="text-red-600 text-xl font-semibold mr-20">OFFICE:</p>
                                                    <p className="text-red-600 text-xl font-semibold">PARTY:</p>
                                                </div>
                                                <div>
                                                    <p className="text-xl">{candidateData?.Role}</p>
                                                    <p className="text-xl">
                                                        {candidateData?.party?.data?.attributes?.PartyName || 'No party affiliation'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Candidate image - Right side */}
                                    <div className="flex md:w-[60%] justify-start">
                                        <div
                                            className="bg-center bg-no-repeat bg-cover rounded-full h-80 w-80 ml-10"
                                            style={{
                                                backgroundImage: `url(https://pitne-voter-app-production.up.railway.app${candidateData?.Headshot.data.attributes.url})`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            {/* Questions, Bio, Links Container */}
                            <div className="flex flex-row pb-20">
                                {/* Links and Bio/Questions 25/75 Split*/}
                                <div className="w-full md:w-[25%]">
                                    {/* Links */}
                                    <div className="flex flex-col justify-center items-center lg:justify-normal md:justify-normal mr-4 text-center">
                                        {candidateData.CampaignSiteLink && (
                                            <ButtonFillEx
                                                name="Campaign Site"
                                                link={candidateData.CampaignSiteLink}
                                                className="text-xs w-40 p-2 xl:my-2 rounded-full bg-white text-red-600 border-red-600 hover:bg-gray-200 hover:border-red-600"
                                            />
                                        )}
                                        {candidateData.LinkedinLink && (
                                            <ButtonFillEx
                                                name="Linkedin"
                                                link={candidateData.LinkedinLink}
                                                className="text-xs w-40 p-2 xl:my-2 rounded-full bg-white text-red-600 border-red-600 hover:bg-gray-200 hover:border-red-600"
                                            />
                                        )}
                                    </div>
                                </div>
                                {/* Questions and Answers if filled out */}
                                <div className="md:w-[75%]">
                                    {/* Bio and Questions Container */}
                                    <div className="pt-2">
                                        {/* bio */}
                                        {candidateData.Biography && (
                                            <div className="mb-4">
                                                <h2 className="text-2xl font-bold text-blue-950">BIOGRAPHY</h2>
                                                <p className="text-lg">{candidateData.Biography}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {Object.entries(questionsAndAnswers) &&
                                            <div className="flex flex-col py-8 my-2 w-full">
                                                <p className="font-semibold mb-4 text-xl">Questions curated by the founder, journalist Yawu Miller.</p>
                                                {Object.entries(questionsAndAnswers).map(([index, qa]) => (
                                                    qa.question && qa.answer ? (
                                                        <Accordion key={index} className='bg-white w-full lg:w-3/4 md:w-3/4 mb-3 rounded-md border-black-800'>
                                                            {/* Question */}
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                                                <Typography className='text-red-600 text-xl'>{qa.question}</Typography>
                                                            </AccordionSummary>
                                                            {/* Answer */}
                                                            <AccordionDetails>
                                                                <Typography className='mb-4 text-xl'>{qa.answer}</Typography>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    ) : null
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl">Candidate not found</p>
                    </div>
                )}
            </div>
        </>
    );
}