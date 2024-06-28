'use client';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Button name, description, variant, and onClick event are customizable
// Note that description and variant are optional
type Props = {
    name: string;
    link: string;
    variant?: ButtonProps['variant'];
    className?: string;
};


// By default, variant is outlined
const ButtonFillEx = ({ name, link, variant="outlined", className }: Props) => {

    const router = useRouter();
    const handleClick = (page: string) => {
        window.open(page, '_blank');
    }

    return (
        <Button
            className={className}
            variant={variant}
            onClick={() => handleClick(link)}
            disableElevation>
            <ArrowForwardIcon />
            {name}
        </Button>
    );
};

export default ButtonFillEx;

