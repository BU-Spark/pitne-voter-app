/* The code below is adapted from the "App bar with responsive menu" code here:
 * https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu 
 * If wanting to add user icon with dropdown to the nav bar, see code linked
 * above (removed from this version bc not implementing) */
import * as React from 'react';
import { AppBar, Box, Button, Tooltip, MenuItem, Toolbar, IconButton, Typography, Menu, Container, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import styles from './NavBar.module.css';

const pages = ['Upcoming Elections', 'Your Voter Info', 'Early Voting', 'Ballot Info', 'Drop Box Locations'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor: "#cbd5e1", boxShadow: "none", color: "#1e293b"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* BELOW IS FOR STANDARD NAVBAR */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'none', lg: 'flex' }, mr: 1 }} /> {/* REPLACE WITH STAR LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'none', lg: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '28px',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PAGE NAME
          </Typography>

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
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center" className={styles.pageLink}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* BELOW IS FOR RESPONSIVE NAVBAR (CONDENSED DROP DOWN) */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' }, mr: 1 }} /> {/* REPLACE WITH STAR LOGO */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '35px',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PAGE NAME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', lg: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                className={styles.pageLink}
                sx={{ my: 2, display: 'block'}}
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
