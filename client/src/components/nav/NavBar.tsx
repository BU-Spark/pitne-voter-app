'use client';
import * as React from 'react';
import { AppBar, Box, Button, Toolbar, IconButton, Container, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (page: string) => {
    router.push(links[page]);
    handleCloseNavMenu();
  };

  const isActive = (path: string) => {
    return currentPath === path;
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <AppBar position="fixed" className="bg-gradient-custom shadow-none text-gray-800 my-0" style={{ zIndex: 1000, top: 0, width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile menu button and menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleClick(page)}
                  sx={{
                    color: isActive(links[page]) ? '#d81624' : 'black',
                    display: 'block',
                    textAlign: 'left',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Menu>
          </Box>

          {/* Logo with added padding on top */}
          <Box sx={{ 
            display: 'flex', 
            mr: 1,
            paddingTop: '10px', // Added padding here
            paddingBottom: '10px'
          }}>
            <img 
              src="/BVLogo.svg" 
              alt="Boston Voter Logo" 
              style={{ 
                height: '60px', 
                cursor: 'pointer',
              }} 
              onClick={() => handleClick('Upcoming Elections')} 
            />
          </Box>

          {/* Desktop menu items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{
                  color: isActive(links[page]) ? '#d81624' : 'black',
                  mx: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderBottom: isActive(links[page]) ? '4px solid #d81624' : 'none'
                  },
                  borderBottom: isActive(links[page]) ? '4px solid #d81624' : 'none'
                }}
              >
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
