'use client';
import * as React from 'react';
import { AppBar, Box, Button, MenuItem, Toolbar, IconButton, Typography, Menu, Container, TextField, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import { keyframes } from '@mui/system';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pages = ['Upcoming Elections', 'Your Voter Info', 'Voting Options', 'Candidate Info', 'Drop Box Locations'];
const links: Record<string, string> = {
  'Upcoming Elections': '/upcomingElections',
  'Your Voter Info': '/voterInfo',
  'Voting Options': '/votingOptions',
  'Candidate Info': '/candidateInfo',
  'Drop Box Locations': '/dropBoxLocations'
};

// List of valid Boston zip codes
const validBostonZipCodes = [
  '02108', '02109', '02110', '02111', '02112', '02113', '02114', '02115', '02116', '02117',
  '02118', '02119', '02120', '02121', '02122', '02123', '02124', '02125', '02126', '02127',
  '02128', '02129', '02130', '02131', '02132', '02133', '02134', '02135', '02136', '02137',
  '02163', '02196', '02199', '02201', '02203', '02204', '02205', '02206', '02210', '02211',
  '02212', '02215', '02217', '02222', '02241', '02266', '02283', '02284', '02293', '02295',
  '02297', '02298'
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [zipCode, setZipCode] = React.useState<string>('');
  const [isEditingZipCode, setIsEditingZipCode] = React.useState<boolean>(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();
  const currentPath = usePathname();

  // Load saved zip code from cookies
  React.useEffect(() => {
    setHasMounted(true);
    const savedZipCode = Cookies.get('zipCode') || '';
    setZipCode(savedZipCode);
  }, []);

  if (!hasMounted) {
    return null; // Return nothing during SSR and initial client render
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (page: string) => {
    handleCloseNavMenu();
    router.push(links[page]);
  };

  const isActive = (path: string | null) => {
    return currentPath === path;
  };

  const handleSaveZipCode = () => {
    if (zipCode && validBostonZipCodes.includes(zipCode)) {
      Cookies.set('zipCode', zipCode, { expires: 7 }); // Save zip code in a cookie for 7 days
      setIsEditingZipCode(false); // Exit edit mode
      setError(null); // Clear any previous error
    } else {
      setError('Please enter a valid Boston zip code.'); // Show error message
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSaveZipCode(); // Save zip code when Enter is pressed
    }
  };

  const handleCloseError = () => {
    setError(null); // Close the error message
  };

  return (
    <AppBar position="fixed" className="bg-gradient-custom shadow-none text-gray-800 my-0" style={{ zIndex: 1000, top: 0, width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Boston Voter Logo */}
          <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, mr: 0 }}>
            <img
              src="/LogoTest.svg"
              alt="Boston Voter Logo"
              style={{ height: '60px', cursor: 'pointer', padding: 10 }}
              onClick={() => handleClick('Upcoming Elections')}
            />
          </Box>

          {/* Page links for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleClick(page)}>
                  <Typography textAlign="center" className={`hover:underline hover:bg-transparent m-4 text-black ${isActive(links[page]) ? 'text-blue-700 ' : ''}`}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Boston Voter title for mobile */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <StarIcon sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, mr: 1, fontSize: '20px', color: '#204cdc', justifyContent: 'flex-end', }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex', lg: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                fontSize: '20px',
                color: '#204cdc',
                textDecoration: 'none',
                justifyContent: 'flex-end',
              }}
              onClick={() => handleClick('Upcoming Elections')}
            >
              Boston Voter
            </Typography>
          </Box>

          {/* Page links for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', lg: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                className={`m-4 ${isActive(links[page]) ? 'border-b-4 border-red-600 text-blue-950 px-2 ' : ''}`}
                sx={{
                  my: 2,
                  display: 'block',
                  transition: 'font-size 0.3s ease',
                  '&:hover': {
                    fontSize: '100%',
                    color: '#172554',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Zip Code Display and Edit */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {isEditingZipCode ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveZipCode} // Save when user clicks outside the input
                autoFocus // Automatically focus the input when editing
                sx={{ width: '100px', mr: 1 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{ color: '#204cdc', fontWeight: 500, cursor: 'pointer' }}
                onClick={() => setIsEditingZipCode(true)} // Switch to edit mode when clicked
              >
                Zip Code: {zipCode || 'N/A'}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default NavBar;