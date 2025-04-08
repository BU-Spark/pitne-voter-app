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
  const [hasMounted, setHasMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();
  const currentPath = usePathname();

  React.useEffect(() => {
    setHasMounted(true);
    const savedZipCode = Cookies.get('zipCode') || '';
    setZipCode(savedZipCode);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleClick = (page: string) => {
    router.push(links[page]);
  };

  const isActive = (path: string | null) => {
    return currentPath === path;
  };

  return (
    <AppBar position="fixed" className="bg-gradient-custom shadow-none text-gray-800 my-0" style={{ zIndex: 1000, top: 0, width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, mr: 0 }}>
            <img src="/LogoTest.svg" alt="Boston Voter Logo" style={{ height: '60px', cursor: 'pointer', padding: 10 }} onClick={() => handleClick('Upcoming Elections')} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', lg: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button key={page} onClick={() => handleClick(page)} className={`m-4 ${isActive(links[page]) ? 'border-b-4 border-red-600 text-blue-950 px-2 ' : ''}`}>
                {page}
              </Button>
            ))}
            <Button
              className={`m-4 ${zipCode ? 'text-blue-950' : 'text-gray-400'}`}
              disabled // Make it non-interactive like the other buttons in terms of click action.
              sx={{
                cursor: 'default', // Optional: change cursor to default to further indicate non-interactivity
                '&:hover': {
                  backgroundColor: 'transparent', // Prevent hover effect
                },
                '&.Mui-disabled': { // Style when disabled to look like normal text
                  color: zipCode ? 'rgba(32, 76, 220, 0.87)' : 'rgba(128, 128, 128, 0.87)', // Match text color, using rgba for opacity if needed
                },
              }}
            >
              Zip Code: <span style={{ color: zipCode ? '#204cdc' : 'inherit', marginLeft: '4px' }}>{zipCode || 'N/A'}</span>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;