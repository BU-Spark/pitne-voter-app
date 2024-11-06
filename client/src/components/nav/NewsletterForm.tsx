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
            const res = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email: emailInput }) });
            const data = await res.json();
      
            if (data.success) {
                setSuccess("Successfully subscribed!");
            } else {
              throw new Error(data?.error || 'Something went wrong, please try again later');
            }
      
          } catch (e) {
            setError((e as Error).message)
          }

        setEmailInput('');
        setButtonLoading(false);
    };

    return (
        <Box sx={{ mt: 4, textAlign: 'center', backgroundColor: '#f0f4f8', p: 4, borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
                Sign Up for Our Newsletter
            </Typography>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    value={emailInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmailInput(e.target.value)}
                    required
                    sx={{ mb: 2, width: '300px' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={buttonLoading}
                    sx={{ minWidth: '100px', height: '56px' }}
                >
                    {buttonLoading ? <CircularProgress size={24} color="inherit" /> : "Subscribe"}
                </Button>

            </form>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
        </Box>
    );
};

export default NewsletterForm;