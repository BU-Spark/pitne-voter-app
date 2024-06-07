// Buttons for internal site links only (they open the link in the same tab)
'use client';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useActivePage } from '@/contexts/ActivePageContext';

// Button name, description, variant, and onClick event are customizable
// Note that description and variant are optional
type Props = {
    name: string;
    link: string;
    variant?: ButtonProps['variant'];
    className?: string;
};

const pageNameMap: Record<string, string> = {
    '/votingOptions': 'Voting Options',
    '/voterInfo': 'Your Voter Info',
    '/ballotInfo': 'Ballot Info',
    '/dropBoxLocations': 'Drop Box Locations',
    '/upcomingElections': 'Upcoming Elections',
};

// By default, variant is contained
const ButtonFill = ({ name, link, variant = "contained", className }: Props) => {

    const { setActivePage } = useActivePage();

    const router = useRouter();
    const handleClick = (page: string) => {
        setActivePage(pageNameMap[page]);
        router.push(page);
    }


    return (
        <Button
            className={className}
            variant={variant}
            onClick={() => handleClick(link)}
            disableElevation>
            {name}
        </Button>

    );
};

export default ButtonFill;

