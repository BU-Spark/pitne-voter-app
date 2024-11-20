// components/nav/NewsletterForm.tsx

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const NewsletterForm: React.FC = () => {
    const [emailInput, setEmailInput] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailInput) {
            setError("Please enter an email address.");
            return;
        }

        setButtonLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess("Successfully subscribed!");
            } else {
                throw new Error(data?.error || 'Something went wrong, please try again later.');
            }
        } catch (e) {
            const errorMessage = (e as Error).message;
        
            if (errorMessage.includes("is already a list member")) {
                setError(`${emailInput} is already subscribed!`);
            } else {
                setError(errorMessage);
            }
        }

        setEmailInput('');
        setButtonLoading(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#e6e8f7',
                padding: '3rem',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                mt: 4,
                gap: { xs: '2rem', sm: '0' },
            }}
        >
            {/* "Stay Posted!" Section */}
            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: 'center', sm: 'right' },
                    zIndex: 1,
                    paddingRight: { xs: '0', sm: '4rem' },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#ff0000',
                        textShadow: '5px 5px 0 #ffffff',
                        mb: 2,
                    }}
                >
                    Stay Posted!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#1D4ED8',
                        fontSize: '1.2rem',
                    }}
                >
                    Help us keep you updated with our newsletter 📰
                </Typography>
            </Box>

            {/* Email Input Form */}
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column', // Stack input, button, and message vertically
                    gap: '1rem',
                    zIndex: 1,
                    paddingLeft: { xs: '0', sm: '4rem' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Stack input and button on small screens
                        gap: '1rem',
                    }}
                >
                    <TextField
                        type="email"
                        placeholder="Your email address"
                        variant="outlined"
                        value={emailInput}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
                        required
                        sx={{
                            width: '300px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={buttonLoading}
                        sx={{
                            backgroundColor: '#0056ff',
                            color: '#ffffff',
                            height: '56px',
                            padding: '0 24px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#003bbb',
                            },
                        }}
                    >
                        {buttonLoading ? <CircularProgress size={24} color="inherit" /> : "Count Me In!"}
                    </Button>
                </Box>

                {/* Display Success or Error Message Below the Form */}
                {error && <Typography color="error" sx={{ mt: 1, textAlign: 'left' }}>{error}</Typography>}
                {success && <Typography color="success.main" sx={{ mt: 1, textAlign: 'left' }}>{success}</Typography>}
            </Box>
        </Box>
    );
};

export default NewsletterForm;