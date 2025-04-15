'use client';
import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { keyframes } from '@mui/system';
import { usePathname } from 'next/navigation';

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

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [hasMounted, setHasMounted] = React.useState(false);

  const router = useRouter();
  const currentPath = usePathname();

  React.useEffect(() => {
    setHasMounted(true);
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
