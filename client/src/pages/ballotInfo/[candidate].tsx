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
                </>
            ) : (
                <p className="text-lg">Loading candidate data...</p>
            )}
        </div>
    );
}
