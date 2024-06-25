/* Deeper candidate profiles that appear when their icon is clicked in the 
 * "What's on the Ballot" dropdown. Styles the entire deep profile page. Pulls
 * data from strapi "Candidates" content.
*/

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';
import { all } from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
        <div>
            {candidateData ? (
                <>
                {/* Main content */}
                <div className='max-w-2xl mx-auto p-4 #d1e4fa'></div>
                <h1 className="text-4xl font-bold mb-4 justify-center text-center">{candidateData?.Name}</h1>
                <div className="border-t border-gray-800 pt-4">
                <div className="flex flex-col items-center">
                    <p className="text-lg mb-2 font-semibold"> {candidateData.Party} </p>
                    <p className="text-lg mb-2 font-semibold"> {candidateData.District} </p>
                    <p className="text-lg mb-2 font-semibold"> {candidateData.ElectionName}</p>
                    {candidateData.CampaignSiteLink && (
                        <p className="text-lg mb-2 font-semibold"> <a href={candidateData.CampaignSiteLink} className="text-blue-500">{candidateData.CampaignSiteLink}</a></p>
                    )}
                    {candidateData.LinkedinLink && (
                        <p className="text-lg mb-2 font-semibold"> <a href={candidateData.LinkedinLink} className="text-blue-500">{candidateData.LinkedinLink}</a></p>
                    )}
                    <p className="text-lg mb-2 font-semibold"> {candidateData.Role}</p>
                </div>
                </div>


                {/* Questions and answers */}
                {Object.entries(questionsAndAnswers).length > 0 ? (
                    <div className="flex flex-col justify-center items-center py-8 px-6 my-6">
                    <p className="text-2xl font-semibold mb-8 text-center">Questions curated by the founder, journalist Yawu Miller</p>
                    {Object.entries(questionsAndAnswers).map(([index, qa]) => (
                        qa.question && qa.answer ? (
                            <Accordion key={index} className='bg-white w-full lg:w-3/4 md:w-3/4 mb-3'>

                                {/* Question */}
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography className='text-blue-700 text-xl'>{qa.question}</Typography>
                                </AccordionSummary>

                                {/* Answer */}
                                <AccordionDetails>
                                    <Typography className='mb-8 text-xl'>{qa.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ) : null
                    ))}
                    </div>
                ) : null}
                </>
            ) : (
                <p className="text-lg">Loading candidate data...</p>
            )}
        </div>
    );
}
