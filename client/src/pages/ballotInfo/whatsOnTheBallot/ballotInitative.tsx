/* Ballot Iniative data is fetched from strapi and displayed as separate
 * dropdowns. Styles the dropdowns and their contents.
*/

'use client';
import { useState, useEffect } from 'react';
import { localBallotInitiativeAPI, deployedBallotInitiativeAPI } from '@/common';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent } from '@mui/material';
import { globalDistrictNum, globalCurrElection } from '@/common';

interface Initiative {
    id: number;
    attributes: {
        District: string;
        InitiativeName: string;
        ProponentEmail: string;
        ElectionName: string;
        ProponentName: string;
        ProponentPhoneNumber: string;
        WhatIsNo: string;
        WhatIsYes: string;
    };
}

interface Init {
    District: string;
    InitiativeName: string;
    ProponentEmail: string;
    ElectionName: string;
    ProponentName: string;
    ProponentPhoneNumber: string;
    WhatIsNo: string;
    WhatIsYes: string;
}

export default function BallotInitiative() {
    const [initiative, setInitiative] = useState<Initiative[]>([]);
    const [districtNum, setDistrictNum] = useState<string | null>(globalDistrictNum);
    const [selectedElection, setSelectedElection] = useState<string | null>(globalCurrElection);
    const [filteredData, setFilteredData] = useState<{ [key: string]: Init[] }>({});


    // Get BI data from strapi
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(deployedBallotInitiativeAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.ok) {
                    const data = (await res.json()).data;
                    console.log(data)
                    setInitiative(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        };
        getData();
    }, []);


    // Filter the BI to the specific district and election
    useEffect(() => {
        setDistrictNum(globalDistrictNum);
        setSelectedElection(globalCurrElection);
        console.log(globalDistrictNum, globalCurrElection);

        if (initiative.length > 0 && globalDistrictNum && globalCurrElection) {
            const curData: { [key: string]: Init[] } = {};

            initiative.forEach((item) => {
                const initDistrict = item.attributes.District;
                const initElection = item.attributes.ElectionName;
                if ((initDistrict.trim().toString() === globalDistrictNum || initDistrict.trim().toString() === 'All Districts') && initElection.trim().toString() === globalCurrElection?.trim()) {
                    if (curData[initDistrict]) {
                        curData[initDistrict].push(item.attributes);
                    } else {
                        curData[initDistrict] = [item.attributes];
                    }
                }
            });
            setFilteredData(curData);
        }
    }, [initiative]);


    return (
        <div className="p-4 text-center w-full lg:w-3/4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            {Object.keys(filteredData).length > 0 ? (
                Object.entries(filteredData).map(([key, items]) => (
                    items.map((item, index) => (
                        <Accordion key={`${key}-${index}`} className="bg-white mb-3">

                            {/* Title */}
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${key}-${index}-content`}
                                id={`panel${key}-${index}-header`}
                            >
                                <Typography className="text-blue-700 text-xl">{item.InitiativeName}</Typography>
                            </AccordionSummary>

                            {/* Content */}
                            <AccordionDetails>
                                {/* Proponent Info */}
                                <div className="text-lg">
                                    <Typography className="text-lg underline">Proponent&apos;s Contact:</Typography>
                                    {item.ProponentName}
                                    <br />
                                    {item.ProponentEmail}
                                    <br />
                                    {item.ProponentPhoneNumber}
                                    <br />
                                </div>

                            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                            {/* YES */}
                            <Card className="flex-1 my-8" sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                                <CardContent>
                                    <Typography className="text-xl underline">What is a vote YES?</Typography>
                                    <ul className="list-disc list-outside text-lg pr-8 text-left pl-8 lg:pl-16 md:pl-16 sm:pl-16 py-2">
                                        {item.WhatIsYes.split('\n').map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* NO */}
                            <Card className="flex-1 lg:my-8 mb-8" sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                                <CardContent>
                                    <Typography className="text-xl underline">What is a vote NO?</Typography>
                                    <ul className="list-disc list-outside text-lg pr-8 text-left pl-8 lg:pl-16 md:pl-16 sm:pl-16 py-2">
                                        {item.WhatIsNo.split('\n').map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))

                ))
            ) : (
                // Case where no BI for the given election and district
                <div className='text-xl'>There is no data about the ballot for the district and election you have selected.</div>
            )}
        </div>
    );
}
