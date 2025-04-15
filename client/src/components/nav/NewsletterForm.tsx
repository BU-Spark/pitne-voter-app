'use client';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';

const FooterLayout: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Email subscription logic
  const [emailInput, setEmailInput] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput) {
      setError('Please enter an email address.');
      return;
    }

    setButtonLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Example subscribe request
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('Successfully subscribed!');
      } else {
        throw new Error(data?.error || 'Something went wrong. Please try again later.');
      }
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes('is already a list member')) {
        setError(`${emailInput} is already subscribed!`);
      } else {
        setError(message);
      }
    }

    setEmailInput('');
    setButtonLoading(false);
  };

  const navigationItems = [
    { name: 'Home', icon: '/home.svg', path: '/upcomingElections' },
    { name: 'Upcoming Elections', icon: '/Calendar.svg', path: '/upcomingElections' },
    { name: 'Voter Info', icon: '/info.svg', path: '/voterInfo' },
    { name: 'Voting Options', icon: '/patch-question-fill.svg', path: '/votingOptions' },
    { name: 'Candidate Info', icon: '/person.svg', path: '/candidateInfo' },
    { name: 'Dropbox Locations', icon: '/location_on.svg', path: '/dropBoxLocations' }
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: { xs: '0', md: '27px' },
        border: { xs: 'none', md: '8px solid #F5F5F5' },
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
      }}
    >
      {/* Left Column */}
      <Box
        sx={{
          flex: { md: '0 0 25%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pr: { md: 3 },
          mb: { xs: 3, md: 0 }
        }}
      >
        <Box>
          {/* B.svg + "Oston" */}
          <Box display="flex" alignItems="center" mb={1}>
            <img src="/B.svg" alt="B" style={{ height: 70, marginRight: 10 }} />
            <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '5rem', fontFamily: 'Inter' }}>
              oston
            </Typography>
          </Box>

          {/* V.svg + RedLine.svg underline + "oter" */}
          <Box display="flex" alignItems="center" mb={2}>
            <Box position="relative" display="inline-flex">
              <img
                src="/V.png"
                alt="V"
                style={{ height: 70, marginRight: 8 }}
              />
              {/* RedLine.svg positioned as an underline */}
              <img
                src="/RedLine.png"
                alt="Red underline"
                style={{
                  position: 'absolute',
                  bottom: -20,
                  left: 3,
                  width: '80%',
                }}
              />
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '5rem', fontFamily: 'Inter' }}>
              oter
            </Typography>
          </Box>

          {/* "Presented by" section */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body2" sx={{ fontSize: '1.0rem' }}>
              Presented by
            </Typography>
            <Box ml={1}>
              <Link href="https://flipsidenews.net/" target="_blank" rel="noopener">
                <img src="/flipside.png" alt="Flipside" style={{ height: 85 }} />
              </Link>
            </Box>
          </Box>
        </Box>
        {/* Bottom: Copyright */}
        <Box mt={2}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            © 2025 <Link href="https://flipsidenews.net/" target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: 'underline' }}>The Flipside</Link>. Published with{' '}
            <Link href="https://www.bu.edu/spark/" target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: 'underline' }}>BU SPARK!</Link> and{' '}
            <Link href="https://flipsidenews.net/" target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: 'underline' }}>The Flipside</Link>.
          </Typography>
        </Box>
      </Box>

      {/* White divider between left and middle columns */}
      <Divider
        flexItem
        orientation={isMobile ? 'horizontal' : 'vertical'}
        sx={{ borderColor: '#fff', mx: 2, opacity: 0.3, my: { xs: 2, md: 0 } }}
      />

      {/* Middle Column: Navigation + Yawu and Social Icons */}
      <Box
        sx={{
          flex: { md: '0 0 30%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          mb: { xs: 3, md: 0 }
        }}
      >
        {/* Navigation Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, textDecoration: 'underline', fontSize: '20px', fontFamily: 'Inter' }}>
            Navigation
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {navigationItems.map((item) => (
              <Box 
                key={item.name} 
                display="flex" 
                alignItems="center"
                onClick={() => router.push(item.path)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <img src={item.icon} alt={item.name} style={{ width: 32, marginRight: 10 }} />
                <Typography variant="body2" sx={{ fontSize: '16px', fontFamily: 'Inter' }}>
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Yawu + Social Icons */}
        <Box mt={2} display="flex" alignItems="center" justifyContent="start">
          <img
            src="/yawu.png"
            alt="Yawu Miller"
            style={{ width: 56, height: 56, borderRadius: '50%', marginRight: 8 }}
          />
          <Typography variant="body2" sx={{ fontSize: '16px', fontFamily: 'Inter' }}>
            Yawu Miller
          </Typography>
          <Box ml={2} display="flex" alignItems="center" gap={1}>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/facebook.svg" alt="Facebook" style={{ width: 32 }} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/reddit.svg" alt="Reddit" style={{ width: 32 }} />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src="/X Logo.svg" alt="X Logo" style={{ width: 32 }} />
            </a>
          </Box>
        </Box>
      </Box>

      {/* White divider between middle and right columns */}
      <Divider
        flexItem
        orientation={isMobile ? 'horizontal' : 'vertical'}
        sx={{ borderColor: '#fff', mx: 2, opacity: 0.3, my: { xs: 2, md: 0 } }}
      />

      {/* Right Column: Email Signup & Feedback Section */}
      <Box
        sx={{
          flex: { md: '1 1 auto' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Email Signup */}
        <Box mb={2}>
          <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Inter' }}>
            Sign Up for Our Email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxWidth: 300,
            }}
          >
            <TextField
              type="email"
              placeholder="Your email address"
              variant="outlined"
              value={emailInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmailInput(e.target.value)
              }
              required
              sx={{ backgroundColor: '#fff', borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={buttonLoading}
              sx={{
                backgroundColor: '#d81624',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                fontFamily: 'Inter',
                '&:hover': {
                  backgroundColor: '#b1151e',
                },
              }}
            >
              {buttonLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Subscribe'
              )}
            </Button>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'left', fontFamily: 'Inter' }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1, textAlign: 'left', fontFamily: 'Inter' }}>
                {success}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Feedback Section */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Inter' }}>
            Feedback?
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <img src="/paperclip.svg" alt="Paperclip" style={{ width: 24 }} />
            <Typography variant="body2" sx={{ fontFamily: 'Inter' }}>
              Fill out usability testing form{' '}
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLServTN5UaZjlLrZO9N2AttK83Fu1Ef2EuzYhsK9g3JRrPr_Jg/viewform"
                target="_blank"
                rel="noopener"
                sx={{ textDecoration: 'underline', color: '#fff' }}
              >
                here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterLayout;