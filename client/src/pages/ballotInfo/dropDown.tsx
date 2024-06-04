import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleCard from './peopleCard';

const dropDownData = [
    {
        title: "City Counselors at Large",
        content: {
            person1: {
                name: 'Shawn Nelson',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/nelson.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/shawn-nelson',
            },
            person2: {
                name: 'Clifton A Braithwaite',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/braithwaite.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/clifton-braithwaite',
            },
            person3: {
                name: 'Julia Mejia',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/mejia.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/julia-mejia',
            }

        },

    },
    {
        title: "Register of Probate",
        content: {
            person1: {
                name: 'Shawn Nelson',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/nelson.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/shawn-nelson',
            },
            person2: {
                name: 'Clifton A Braithwaite',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/braithwaite.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/clifton-braithwaite',
            },
            person3: {
                name: 'Julia Mejia',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/mejia.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/julia-mejia',
            }

        },

    },
    {
        title: "County Clerk of Courts Civl Business",
        content: {
            person1: {
                name: 'Shawn Nelson',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/nelson.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/shawn-nelson',
            },
            person2: {
                name: 'Clifton A Braithwaite',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/braithwaite.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/clifton-braithwaite',
            },
            person3: {
                name: 'Julia Mejia',
                affliation: 'Non-Partisan',
                picture: 'https://www.boston.gov/sites/default/files/styles/city_councilor_profile/public/city-councilor-profile/mejia.jpg?itok=3Z6J9Q9v',
                link: 'https://www.boston.gov/departments/city-council/julia-mejia',
            }

        },

    },

]
export default function DropDown() {
    return (
        <div className='p-4 w-1/2 text-center'>
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

                            <div key={idx}>
                                <PeopleCard name={person.name} affliation={person.affliation} picture={person.picture} link={person.link} />
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
