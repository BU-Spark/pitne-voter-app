'use client';
import React, { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Link,
  useTheme,
  useMediaQuery,
  IconButton
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

  // Scroll functions
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToElectionDates = useCallback(() => {
    const element = document.getElementById('election-dates');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
    { name: 'Home', icon: '/Home.svg', path: '/upcomingElections', action: scrollToTop },
    { name: 'Upcoming Elections', icon: '/Calendar.svg', path: '/upcomingElections', action: scrollToElectionDates },
    { name: 'Voter Info', icon: '/Info.svg', path: '/voterInfo' },
    { name: 'Voting Options', icon: '/patch-question-fill.svg', path: '/votingOptions' },
    { name: 'Candidate Info', icon: '/person.svg', path: '/candidateInfo' },
    { name: 'Dropbox Locations', icon: '/location_on.svg', path: '/dropBoxLocations' }
  ];

  const handleNavigation = useCallback((path: string, action?: () => void) => {
    if (path === window.location.pathname && action) {
      action();
    } else {
      router.push(path);
    }
  }, [router]);

  return (
    <Box        
    sx={{
      backgroundColor: '#F5F5F5',
    }}
    >
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: { xs: '10', md: '27px' },
          border: { xs: 'none', md: '8px solid #F5F5F5' },
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          position: 'relative',
        }}
      >
        {/* Back to top button */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#fff',
            color: '#000',
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
            zIndex: 1,
          }}
        >
          <img src="/Chevron-up.svg" alt="Back to top" style={{ width: 24, height: 24 }} />
        </IconButton>

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
              <img src="/B.svg" alt="B" style={{ height: 60, marginRight: 8 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', fontFamily: 'Inter', marginLeft: -0.6 }}>
                oston
              </Typography>
            </Box>

            {/* V.svg + RedLine.svg underline + "oter" */}
            <Box display="flex" alignItems="center" mb={2}>
              <Box position="relative" display="inline-flex">
                <img
                  src="/V.png"
                  alt="V"
                  style={{ height: 60, marginRight: 8 }}
                />
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
              <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '4rem', fontFamily: 'Inter', marginLeft: -0.6 }}>
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
            mb: { xs: 3, md: 0 },
            pr: { md: 2 }
          }}
        >
          {/* Navigation Section */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, textDecoration: 'underline', fontSize: '18px', fontFamily: 'Inter' }}>
              Navigation
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {navigationItems.map((item) => (
                <Box 
                  key={item.name} 
                  display="flex" 
                  alignItems="center"
                  onClick={() => handleNavigation(item.path, item.action)}
                  sx={{
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.02)',
                      '& .nav-text': {
                        fontWeight: '600',
                        fontSize: '17px',
                        letterSpacing: '0.25px'
                      }
                    }
                  }}
                >
                  <img src={item.icon} alt={item.name} style={{ width: 28, marginRight: 8 }} />
                  <Typography variant="body2" className="nav-text" sx={{ 
                    fontSize: '15px', 
                    fontFamily: 'Inter',
                    transition: 'all 0.2s ease'
                  }}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Yawu + Social Icons */}
          <Box mt={2} display="flex" alignItems="center" justifyContent="start" gap={1}>
            <Link href="/aboutUs" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
              <img
                src="/Yawu.png"
                alt="Yawu Miller"
                style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 8 }}
              />
              <Typography variant="body2" sx={{ fontSize: '16px', fontFamily: 'Inter' }}>
                Yawu Miller
              </Typography>
            </Link>
            <Box ml={2} display="flex" alignItems="center" gap={1.5}>
              <a href="https://bsky.app/profile/did:plc:qwrxbyotsv7zhgdmnp47q7ym" target="_blank" rel="noreferrer">
                <img src="/Blue-Sky.png" alt="Blue Sky" style={{ width: 32 }} />
              </a>
              <a href="https://x.com/flipsideboston" target="_blank" rel="noreferrer">
                <img src="/X Logo.svg" alt="X (Twitter)" style={{ width: 32 }} />
              </a>
              <a href="https://www.facebook.com/flipsidenewsboston" target="_blank" rel="noreferrer">
                <img src="/facebook.svg" alt="Facebook" style={{ width: 32 }} />
              </a>
            </Box>
          </Box>
        </Box>

        {/* Right Column: Email Signup & Feedback Section */}
        <Box
          sx={{
            flex: { md: '1 1 auto' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* BV × The Flipside Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 3,
              gap: 2
            }}
          >
            <img 
              src="/BVLogo_white.svg" 
              alt="Boston Voter" 
              style={{ height: 40 }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#fff', 
                fontFamily: 'Inter',
                fontWeight: 'bold',
                mx: 1
              }}
            >
              ×
            </Typography>
            <img 
              src="/flipside.png" 
              alt="The Flipside" 
              style={{ height: 40 }} 
            />
          </Box>

          {/* Email Signup */}
          <Box mb={2} sx={{ width: '100%', maxWidth: 300 }}>
            <Typography variant="h6" sx={{ 
              mb: 1, 
              fontFamily: 'Inter',
              textAlign: 'center',
              fontSize: '18px'
            }}>
              Sign Up for Our Email
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
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
          <Box mt={2} sx={{ width: '100%', maxWidth: 300 }}>
            <Typography variant="body2" sx={{ 
              mb: 1, 
              fontFamily: 'Inter',
              textAlign: 'center'
            }}>
              Feedback?
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <img src="/Paperclip.svg" alt="Paperclip" style={{ width: 24 }} />
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
    </Box>
  );
};

export default FooterLayout;