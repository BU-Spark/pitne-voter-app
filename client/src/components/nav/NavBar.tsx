/* The code below is adapted from the "App bar with responsive menu" code here:
 * https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu 
 * If wanting to add user icon with dropdown to the nav bar, see code linked
 * above (removed from this version bc not implementing) */
'use client';
import * as React from 'react';
import { AppBar, Box, Button, MenuItem, Toolbar, IconButton, Typography, Menu, Container } from '@mui/material';
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

const pages = ['Upcoming Elections', 'Your Voter Info', 'Voting Options', 'Candidate Info', /*'Ballot Info',*/ 'Drop Box Locations'];
const links: Record<string, string> = {
  'Upcoming Elections': '/upcomingElections',
  'Your Voter Info': '/voterInfo',
  'Voting Options': '/votingOptions',
  'Candidate Info': '/candidateInfo',
  // 'Ballot Info': '/ballotInfo',
  'Drop Box Locations': '/dropBoxLocations'
};


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const router = useRouter()

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

  // Below is testing for active page link
  const currentPath = usePathname();
  const isActive = (path: string | null) => {
    return currentPath === path;
  };

  // const handleClearData = () => {
  //   Cookies.remove('address');
  //   Cookies.remove('pollingInfo');
  //   Cookies.remove('cookieConsent');
  //   alert('All user data has been cleared.');
  // };

  return (
    <AppBar position="fixed" className="bg-gradient-custom shadow-none text-gray-800 my-0" style={{ zIndex: 1000, top: 0, width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* BELOW IS FOR STANDARD NAVBAR */}
          <StarIcon sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, mr: 1, fontSize: '20px', color: '#204cdc' }} /> {/* REPLACE WITH STAR LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/upcomingElections"
            sx={{
              display: { xs: 'none', md: 'none', lg: 'flex' },
              fontWeight: 700,
              fontSize: '20px',
              color: '#204cdc',
              textDecoration: 'none',

            }}
            onClick={() => {
              handleClick('Upcoming Elections');
            }}

          >
            Boston Voter
          </Typography>

          {/* Page links below */}
          {/* This appears to be useless code */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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


          {/* BELOW IS FOR RESPONSIVE NAVBAR (CONDENSED DROP DOWN) */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end', // Align items to the right
            alignItems: 'center', // Center items vertically
          }}>
            <StarIcon sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, mr: 1, fontSize: '20px', color: '#204cdc', justifyContent: 'flex-end', }} /> {/* REPLACE WITH STAR LOGO */}
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

              onClick={() => {
                handleClick('Upcoming Elections');
              }} >
              Boston Voter
            </Typography>
          </Box>

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

          {/* Clear Data Button */}
          {/* <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearData}
              sx={{ textTransform: 'none' }}
            >
              Clear User Data
            </Button>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

