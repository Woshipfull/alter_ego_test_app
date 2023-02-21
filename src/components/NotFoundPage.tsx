import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${'https://unsplash.com/photos/sxiSod0tyYQ/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc2OTcyMzg0&force=true'})`,
        borderRadius: 0,
        pt: 5,
        pb: 5,
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
                {t('notFoundPage.title')}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {t('notFoundPage.description')}
              </Typography>
              <Link variant="subtitle1">
                <RouterLink
                  to="/"
                  style={{ color: 'yellowgreen', textDecoration: 'none' }}
                >
                  {t('notFoundPage.goHomeLink')}
                </RouterLink>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default NotFoundPage;
