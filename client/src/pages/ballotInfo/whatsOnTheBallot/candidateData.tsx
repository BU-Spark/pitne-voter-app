'use client'
import { useEffect, useState } from 'react';
import { localCandidateAPI, deployedCandidateAPI } from '@/common';

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

export default function CandiateData() {
    const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([])
    const [filteredCandiateData, setFilteredCandidateData] = useState<{ [key: string]: Candidate[] }>({})


    useEffect(() => {
        // Fetch data here
        const getData = async () => {
            try {
                const response = await fetch(localCandidateAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json()
                    setAllCandidateData(data.data)
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        getData()

    }, [])

    useEffect(() => {
        console.log(allCandidateData)
        // Query data, store data to new variable as nested hashtable based on the election date and district 
        // loop through the data, match the election data and district type, then check to see if their role is already in the hashtable
        // if yes, add another person to the value . If no, initialize the key with the person the valye 

        const sortedData: { [key: string]: Candidate[] } = {}

        const district = 'District 1'
        const election = "Primary Municipal Election"

        if (allCandidateData.length > 0) {
            allCandidateData.forEach((candidateDataObject: CandidateDataObject) => {

                if (candidateDataObject.attributes.District.trim() === district && candidateDataObject.attributes.ElectionName === election) {
                    const candidate: Candidate = {
                        attributes: candidateDataObject.attributes
                    };

                    if (sortedData[candidate.attributes.Role]) {
                        sortedData[candidate.attributes.Role].push(candidate);
                    } else {
                        sortedData[candidate.attributes.Role] = [candidate];
                    }
                }
            });
            setFilteredCandidateData(sortedData);
        }

        console.log(sortedData)
    }, [allCandidateData])

    useEffect(() => {
        console.log(filteredCandiateData)

    }, [filteredCandiateData])

    return (
        <div>
            <h1> Candidate Data </h1>
        </div>
    )
}