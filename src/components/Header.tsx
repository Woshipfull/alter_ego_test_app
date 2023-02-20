import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SignInModal from './SignInModal';

import { useSelector } from 'react-redux';
import { getIsAutorised } from '../store/appStateSlice';

import { useTranslation } from 'react-i18next';

type Props = {
  currentLocation: string;
};

interface ILngs {
  [key: string]: string;
}

const lngs: ILngs = {
  en: 'ENG',
  uk: 'УКР',
};

const Header: React.FC<Props> = ({ currentLocation }) => {
  const { t, i18n } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const isAutorised = useSelector(getIsAutorised);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderMenuBtn = (btnName: string, href: string) => {
    const color = currentLocation === href ? '#002984' : 'black';
    return (
      <MenuItem onClick={handleCloseNavMenu}>
        <Link style={{ textDecoration: 'none', color }} to={href}>
          <Typography textAlign="center">{btnName}</Typography>
        </Link>
      </MenuItem>
    );
  };

  const renderNavBtn = (btnName: string, href: string) => {
    const color = currentLocation === href ? 'yellow' : 'white';
    return (
      <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: 'block' }}>
        <Link style={{ textDecoration: 'none', color }} to={href}>
          {btnName}
        </Link>
      </Button>
    );
  };

  const renderLngsSwitcher = () => {
    const activeLng = i18n.resolvedLanguage;
    return (
      <ButtonGroup
        variant="text"
        color="inherit"
        aria-label="text button group"
        sx={{ my: 2 }}
      >
        {Object.keys(lngs).map((lng) =>
          lng === activeLng ? (
            <Button key={lng} disabled>
              {lngs[lng]}
            </Button>
          ) : (
            <Button key={lng} onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng]}
            </Button>
          )
        )}
      </ButtonGroup>
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'darkslategray' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('title')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderMenuBtn(t('navBtns.home'), '/')}
              {renderMenuBtn(t('navBtns.news'), '/news')}
              {isAutorised ? (
                renderMenuBtn(t('navBtns.profile'), '/profile')
              ) : (
                <SignInModal
                  placement="menu"
                  handleCloseMenu={handleCloseNavMenu}
                />
              )}

              <MenuItem onClick={handleCloseNavMenu}>
                {renderLngsSwitcher()}
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="body2"
            component="a"
            href=""
            textAlign="center"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('title')}
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {renderNavBtn(t('navBtns.home'), '/')}
            {renderNavBtn(t('navBtns.news'), '/news')}
            {isAutorised ? (
              renderNavBtn(t('navBtns.profile'), '/profile')
            ) : (
              <SignInModal
                placement="navbar"
                handleCloseMenu={handleCloseNavMenu}
              />
            )}

            {renderLngsSwitcher()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
