'use client';
import { Button, ButtonProps } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './ButtonFill.module.css';

// Button name, description, variant, and onClick event are customizable
// Note that description and variant are optional
type Props = {
    name: string;
    description?: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
};


// By default, variant is contained
const ButtonFill = ({ name, description, onClick, variant = "contained" }: Props) => {
    return (
        <div className={styles.container}>
            <Button
            style={{backgroundColor: "#1d4ed8"}}
            className="rounded-3xl"
            variant={variant}
            size="large"
            onClick={onClick}
            disableElevation>
                {name}
            </Button>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default ButtonFill;
