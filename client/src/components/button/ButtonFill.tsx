// Buttons for internal site links only (they open the link in the same tab)
'use client';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

// Button name, description, variant, and onClick event are customizable
// Note that description and variant are optional
type Props = {
    name: string;
    link: string;
    variant?: ButtonProps['variant'];
    className?: string;
};

// By default, variant is contained
const ButtonFill = ({ name, link, variant = "contained", className }: Props) => {


    const router = useRouter();
    const handleClick = (page: string) => {
        // Check if the URL is external (contains protocol or starts with //)
        const isExternal = /^(https?:\/\/|\/\/)/.test(page) && !page.includes(window.location.hostname);
        
        if (isExternal) {
            // Open external links in a new tab
            window.open(page, '_blank', 'noopener,noreferrer');
        } else {
            // Navigate to internal links in the same tab
            router.push(page);
        }
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

