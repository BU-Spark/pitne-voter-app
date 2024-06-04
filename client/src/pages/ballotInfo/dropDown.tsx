import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleCard from './peopleCard';
import { dropDownData } from './dropDownData';


export default function DropDown() {
    return (
        <div className='p-4 text-center w-full sm:w-3/4 md:w-1/2'>
            {dropDownData.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <Typography>{item.title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {/* Map over the content of each item */}
                        {Object.values(item.content).map((person, idx) => (
                            <div key={idx} className=''>
                                <PeopleCard name={person.name} affliation={person.affliation} picture={person.picture} link={person.link} />
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
