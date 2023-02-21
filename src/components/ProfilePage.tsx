import { useEffect } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { getIsAutorised, logOut } from '../store/appStateSlice';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAutorised = useSelector(getIsAutorised);

  const handleLogOut = () => {
    localStorage.removeItem('username');
    dispatch(logOut());
    navigate('/');
  };

  useEffect(() => {
    if (!isAutorised) {
      navigate('/');
    }
  });

  return (
    <>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${'./profile.jpg'})`,
          borderRadius: 0,
        }}
      >
        <Container>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.4)',
            }}
          />
          <Grid container>
            <Grid item md={6} lg={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {t('profilePage.title')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleLogOut}>{t('profilePage.logoutBtn')}</Button>
      </Container>
    </>
  );
};

export default ProfilePage;
