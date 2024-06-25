/* Deeper candidate profiles that appear when their icon is clicked in the 
 * "What's on the Ballot" dropdown. Styles the entire deep profile page. Pulls
 * data from strapi "Candidates" content.
*/

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';
import { all } from 'axios';
import ButtonFillEx from '@/components/button/ButtonFillEx';
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
        <div className="p-4 #d1e4fa ">
            {candidateData ? (
                <>
                <h1 className="text-6xl pb-2 font-bold mb-8 justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{candidateData?.Name}</h1>
                <div className="border-t border-white pt-4">
                <div className="flex flex-col ">
                {/* <div className="bg-white rounded-lg shadow-xl p-18 flex flex-col"> */}
                    
                    <p className="text-3xl mb-2 font">{candidateData.Party} </p>
                    <p className="text-xl mb-2">{candidateData.Role}</p>
                    <p className="text-3xl mb-2">{candidateData.District} </p> {/*if all districts then do not display it*/}
                    <p className="text-3xl mb-2">{candidateData.ElectionName}</p>

                    <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                    {candidateData.CampaignSiteLink && (
                        <ButtonFillEx name='Campaign Site' link={candidateData.CampaignSiteLink} className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />

                    )}
                    {candidateData.LinkedinLink && (
                        <ButtonFillEx name='Linkedin Link' link={candidateData.LinkedinLink} className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' />                    )}
                    </div>
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
            ) : null}
        </div>
    )
}
