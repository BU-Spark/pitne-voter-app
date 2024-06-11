/* The code below is adapted from the "App bar with responsive menu" code here:
 * https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu 
 * If wanting to add user icon with dropdown to the nav bar, see code linked
 * above (removed from this version bc not implementing) */
'use client';
import * as React from 'react';
import { AppBar, Box, Button, Tooltip, MenuItem, Toolbar, IconButton, Typography, Menu, Container, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import { useActivePage } from '@/contexts/ActivePageContext';

const pages = ['Upcoming Elections', 'Your Voter Info', 'Voting Options', 'Ballot Info', 'Drop Box Locations'];
const links: Record<string, string> = {
  'Upcoming Elections': '/upcomingElections',
  'Your Voter Info': '/voterInfo',
  'Voting Options': '/votingOptions',
  'Ballot Info': '/ballotInfo',
  'Drop Box Locations': '/dropBoxLocations'
};


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const { activePage, setActivePage } = useActivePage();

  const router = useRouter()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (page: string) => {
    setActivePage(page);
    handleCloseNavMenu();
    router.push(links[page]);
  }



  return (
    <AppBar position="static" className="bg-transparent shadow-none text-gray-800 my-4">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* BELOW IS FOR STANDARD NAVBAR */}
          <StarIcon sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, mr: 1, fontSize: '26px' }} /> {/* REPLACE WITH STAR LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'none', md: 'none', lg: 'flex' },
              fontWeight: 700,
              fontSize: '28px',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {
              setActivePage('Upcoming Elections');
              router.push('/upcomingElections')
            }}
          >
            Boston Voter
          </Typography>

          {/* Page links below */}
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
                  <Typography textAlign="center" className={`hover:underline hover:bg-transparent m-4 text-black ${activePage === page ? 'text-blue-700 ' : ''}`}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/* BELOW IS FOR RESPONSIVE NAVBAR (CONDENSED DROP DOWN) */}
          <StarIcon sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, mr: 1, fontSize: '30px' }} /> {/* REPLACE WITH STAR LOGO */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '35px',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => {
              setActivePage('Upcoming Elections');
              router.push('/upcomingElections')
            }}
          >
            Boston Voter
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', lg: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                className={`hover:underline hover:bg-transparent m-4 ${activePage === page ? 'bg-blue-700 rounded-full text-white px-2 hover:text-blue-700' : ''}`}
                sx={{ my: 2, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
