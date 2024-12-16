// src/components/cookieConsent.tsx

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Typography, Box } from '@mui/material';

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    // show banner if user has not accepted yet
    useEffect(() => {
        const consent = Cookies.get('cookieConsent');
        if (consent !== 'accepted') {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        Cookies.set('cookieConsent', 'accepted', { expires: 365 });
        setShowBanner(false);
    };
    const handleDeny = () => {
        // in case cookieConsent expires and user clicks deny, clear all cookies, expired or not.
        Cookies.remove('cookieConsent');
        Cookies.remove('address');
        Cookies.remove('pollingInfo');
        setShowBanner(false)
    }

    return (
        <>
            {showBanner && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        We use cookies to enhance your experience by caching location information securely on your browser. By clicking "Accept," you consent to our use of cookies.
                        {/* <a href="/cookie-policy" style={{ color: '#ffdd57', marginLeft: '5px' }}>Learn more</a> */}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAccept}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeny}
                        sx={{ ml: 2 }}
                    >
                        Deny
                    </Button>
                </Box>
            )}
        </>
    );
};

export default CookieConsent;
