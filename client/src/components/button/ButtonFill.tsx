'use client';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

// Button name, description, variant, and onClick event are customizable
// Note that description and variant are optional
type Props = {
    name: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    className?: string;
};

// By default, variant is contained
const ButtonFill = ({ name, onClick, variant = "contained", className }: Props) => {

    return (
        <Button
            className={className}
            variant={variant}
            onClick={onClick}
            disableElevation>
            {name}
        </Button>

    );
};

export default ButtonFill;
