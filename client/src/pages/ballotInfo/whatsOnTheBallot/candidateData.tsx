/* Gets all candidates from strapi, queries them based on the voter's district
 * and selected election, and displays the filtered results. Styles the outer
 * dropdowns of candidates and the description of the role.
*/

'use client'
import { useEffect, useState } from 'react';
import { localCandidateAPI, deployedCandidateAPI, localCandidateRoleAPI, deployedCandidateRoleAPI, globalDistrictNum, globalCurrElection } from '@/common';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleCard from './peopleCard';


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


export default function CandidateData() {
    const [allCandidateData, setAllCandidateData] = useState<CandidateDataObject[]>([])
    const [filteredCandidateData, setFilteredCandidateData] = useState<{ [key: string]: Candidate[] }>({})
    const [districtNum, setDistrictNum] = useState<string | null>(globalDistrictNum);
    const [selectedElection, setSelectedElection] = useState<string | null>(globalCurrElection);
    const [candidateRoleDate, setCandidateRoleData] = useState<{ [key: string]: string }>({})


    // Fetch candidate data from strapi
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(localCandidateAPI + '?populate=*', {
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
        };

        // Actually fetch data only if districtNum and election are set
        if (districtNum && selectedElection) {
            getData();
        }
    }, [districtNum, selectedElection]);


    // Set the district number to the global number which was set in DistrictForm
    useEffect(() => {
        setDistrictNum(globalDistrictNum);
        setSelectedElection(globalCurrElection);
    }, [globalDistrictNum, globalCurrElection]);


    /* Query data, store data to new variable as nested hashtable based on the election date and district.
     * Loop through the data, match the election data and district type, then check to see if their role
     * is already in the hashtable. If yes, add another person to the value . If no, initialize the key
     * with the person and value */
    useEffect(() => {
        const sortedData: { [key: string]: Candidate[] } = {};
        const roleData: { [key: string]: string } = {};

        // Get candidate role from strapi
        const getData = async () => {
            try {
                const response = await fetch(localCandidateRoleAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = (await response.json()).data;
                    data.forEach((role: any) => {
                        roleData[role.attributes.Role_Name] = role.attributes.Role_Description;
                    })

                    setCandidateRoleData(roleData);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getData();

        // Filter candidates and add to hash table
        if (allCandidateData.length > 0 && districtNum) {
            allCandidateData.forEach((candidateDataObject: CandidateDataObject) => {
                const candidateDistrict = candidateDataObject.attributes.District.trim();
                const candidateElection = candidateDataObject.attributes.ElectionName.trim();
                if ((candidateDistrict === districtNum || candidateDistrict === 'All Districts') && candidateElection === selectedElection?.trim()) {
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

        //console.log(sortedData);
    }, [allCandidateData, districtNum, selectedElection])


    useEffect(() => {
        //console.log(filteredCandidateData);

    }, [filteredCandidateData])


    return (
        <div className='p-4 text-center w-full lg:w-3/4'>

            {/* Map over the filtered candidates */}
            {Object.keys(filteredCandidateData).length > 0 ? (
                <>
                    {Object.keys(filteredCandidateData).map((role, index) => (
                        <Accordion key={index} className='bg-white mb-3'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                            >
                                <Typography className='text-blue-700 text-xl'>{role}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                {/* Description of the role */}
                                <Typography className='mx-4 mb-8 text-lg'>
                                    {candidateRoleDate[role] ? candidateRoleDate[role] : 'No description available for this role'}
                                </Typography>

                                {/* Map over the candidates for each role */}
                                <div className='flex flex-wrap'>
                                    {filteredCandidateData[role].map((candidate, idx) => (
                                        <PeopleCard
                                            key={idx}
                                            name={candidate.attributes.Name}
                                            affiliation={candidate.attributes.Party}
                                            picture={candidate.attributes.Headshot.data.attributes.url ?? ''}// Default empty string or provide a placeholder URL
                                            link={candidate.attributes.CampaignSiteLink ?? ''} // Default empty string or provide a placeholder URL
                                        />


                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </>
            ) : (
                <p className="text-xl">There is no data about the ballot for the district and election you have selected.</p>
            )}
        </div>
    )
}