'use client'
import { useState, useEffect } from 'react';
import { localBallotInitiativeAPI, deployedBallotInitiativeAPI } from '@/common';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ballotInitData } from '@/utliity/BallotInfo/ballotInitData'
import { Card, CardContent } from '@mui/material';


interface Initiative {
    id: Number,
    attributes: {
        title: String,
    }
}

export default function BallotInitative() {
    const [initiative, setInitiative] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(localBallotInitiativeAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (res.ok) {
                    const data = (await res.json()).data
                    setInitiative(data)
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        getData()

    }, [])

    useEffect(() => {
        console.log(initiative)
        if (initiative.length > 0) {
            console.log(initiative[0].attributes)
        }

    }, [initiative])

    return (
        <div className='p-4 text-center w-full sm:w-3/4' style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            {initiative.length > 0 ? (
                initiative.map((item, index) => (
                    <Accordion key={index} className='bg-white mb-3'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${item.id}-content`}
                            id={`panel${item.id}-header`}
                        >
                            <Typography className='text-blue-700 text-xl'>{item.attributes.InitiativeName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='text-lg'>
                                <Typography className='text-lg underline'>Proponent&apos;s Contact:</Typography>
                                {item.attributes.ProponentName}<br />
                                {item.attributes.ProponentEmail}<br />
                                {item.attributes.ProponentPhoneNumber}<br />
                            </div>
                            <Card className='my-8' sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                                <CardContent>
                                    <Typography className='text-xl underline'>What is a vote YES?</Typography>
                                    <ul className='list-disc list-outside text-lg pr-8 text-left pl-16 py-2'>
                                        {item.attributes.WhatIsYes
                                        }
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className='mt-8 mb-5' sx={{ backgroundColor: '#f4f4f4', minWidth: 275 }}>
                                <CardContent>
                                    <Typography className='text-xl underline'>What is a vote NO?</Typography>
                                    <ul className='list-disc list-outside text-lg pr-8 text-left pl-16 py-2'>
                                        {item.attributes.WhatIsNo}
                                    </ul>
                                </CardContent>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <div>There is no data about the ballot for the district and election you have selected.</div>
            )}
        </div>
    );
}