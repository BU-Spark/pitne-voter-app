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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <h1 className="text-3xl font-bold mb-4">Candidate: {candidateName}</h1>
            {candidateData ? (
                <div className="border-t border-gray-200 pt-4">
                    <p className="text-lg mb-2"><span className="font-semibold">Party:</span> {candidateData.Party}</p>
                    <p className="text-lg mb-2"><span className="font-semibold">District:</span> {candidateData.District}</p>
                    <p className="text-lg mb-2"><span className="font-semibold">Election Name:</span> {candidateData.ElectionName}</p>
                    {candidateData.CampaignSiteLink && (
                        <p className="text-lg mb-2"><span className="font-semibold">Campaign Site:</span> <a href={candidateData.CampaignSiteLink} className="text-blue-500">{candidateData.CampaignSiteLink}</a></p>
                    )}
                    {candidateData.LinkedinLink && (
                        <p className="text-lg mb-2"><span className="font-semibold">LinkedIn:</span> <a href={candidateData.LinkedinLink} className="text-blue-500">{candidateData.LinkedinLink}</a></p>
                    )}
                    <p className="text-lg mb-2"><span className="font-semibold">Role:</span> {candidateData.Role}</p>
                </div>
            ) : (
                <p className="text-lg">Loading candidate data...</p>
            )}
        </div>
        </div>
    );
}
