/* Deeper candidate profiles that appear when their icon is clicked in the 
 * "What's on the Ballot" dropdown. Styles the entire deep profile page. Pulls
 * data from strapi "Candidates" content.
*/

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';
import { all } from 'axios';

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
}

interface CandidateDataObject {
    id: number;
    attributes: CandidateAttributes;
}

interface Candidate {
    attributes: CandidateAttributes;
}

export default function Candidate() {
    const router = useRouter();

    const [candidateName, setCandidateName] = useState<string>('');
    const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([])
    const [candidateData, setCandidateData] = useState<CandidateAttributes | null>(null);

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


    return (
        
        <div className="max-w-2xl mx-auto p-4 #d1e4fa">
            {candidateData ? (
                <>
                <h1 className="text-6xl font-bold mb-6 justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{candidateData?.Name}</h1>
                <div className="border-t border-white pt-4">
                <div className="flex flex-col items-center">
                <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col">
                    <p className="text-lg mb-2 font"><span className="text-lg font-bold">Party: </span>{candidateData.Party} </p>
                    <p className="text-lg mb-2"><span className="text-lg font-bold">Role: </span>{candidateData.Role}</p>
                    <p className="text-lg mb-2"><span className="text-lg font-bold">District: </span> {candidateData.District} </p>
                    <p className="text-lg mb-2"><span className="text-lg font-bold">Election Name: </span> {candidateData.ElectionName}</p>
                    {candidateData.CampaignSiteLink && (
                        <p className="text-lg mb-2 font-semibold text-center items-center"> <a href={candidateData.CampaignSiteLink} className="underline">Campaign Site</a></p>
                    )}
                    {candidateData.LinkedinLink && (
                        <p className="text-lg mb-2 font-semibold text-center items-center"> <a href={candidateData.LinkedinLink} className="underline">Linkedin Link</a></p>
                    )}
                </div>
                </div>
                </div>
                </>
            ) : (
                <p className="text-lg">Loading candidate data...</p>
            )}
        </div>
    );
}
