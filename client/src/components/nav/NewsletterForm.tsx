// components/nav/NewsletterForm.tsx

'use client';
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Basic email validation
        if (!email) {
            setError("Email is required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        // Reset error and set success message
        setError(null);
        setSuccess("Thank you for subscribing!");

        // Here, you would typically handle the submission to your newsletter service (e.g., Mailchimp)
        console.log("Submitting email:", email);

        // Clear the email input
        setEmail('');
    };

    return (
        <Box sx={{ mt: 4, textAlign: 'center', backgroundColor: '#f0f4f8', p: 4, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
                Sign Up for Our Newsletter
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 2, width: '300px' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Subscribe
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success.main">{success}</Typography>}
        </Box>
    );
};

export default NewsletterForm;
