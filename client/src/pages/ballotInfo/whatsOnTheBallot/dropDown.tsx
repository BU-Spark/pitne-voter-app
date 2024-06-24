'use client'
import { useEffect, useState } from 'react';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleCard from './peopleCard';
import { dropDownData } from '@/utliity/BallotInfo/dropDownData'
import { localStrapiURL, deployedStrapiURL } from '@/common';


export default function DropDown() {


    return (
        <div className='p-4 text-center w-full sm:w-3/4 ' style={{ paddingLeft: '24px', paddingRight: '24px' }} >

            {dropDownData.map((item, index) => (
                <Accordion key={index} className='bg-white mb-3'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <Typography className='text-blue-700 text-lg'>{item.title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {/* Description of the role (NOTE: WILL NEED TO MAKE THIS DYNAMIC AS WELL)*/}
                        <Typography className='mx-4 mb-8 text-lg'>Councilors are elected every two years by the citizens of Boston. The council is made up of four at-large councilors that represent the entire city, and nine district councilors that represent specific areas of the city. The City Council serves as a link between the citizens of Boston and their municipal government.</Typography>

                        {/* Map over the content of each item */}
                        <div className='flex flex-wrap'>
                            {Object.values(item.content).map((person, idx) => (
                                <PeopleCard key={idx} name={person.name} affliation={person.affliation} picture={person.picture} link={person.link} />
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
