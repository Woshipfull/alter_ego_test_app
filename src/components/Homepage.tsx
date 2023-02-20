import * as React from 'react';
import { Container, Paper, Typography, Grid, Link, Box } from '@mui/material';

import ProjectPost from './ProjectPost';

import { useTranslation } from 'react-i18next';

interface IProjects {
  [key: string]: {
    imagePath: string;
    siteLink: string;
    repoLink: string;
  };
}

const projects: IProjects = {
  TicTacToe: {
    imagePath: 'alter_ego_test_app/TTT.png',
    siteLink: 'https://tic-tac-toe-topaz-gamma.vercel.app',
    repoLink: 'https://github.com/Woshipfull/Tic-Tac-Toe',
  },
  HelloChat: {
    imagePath: 'alter_ego_test_app/HCh.png',
    siteLink: 'https://hellochat-production.up.railway.app',
    repoLink: 'https://github.com/Woshipfull/HelloChat',
  },
  CatHub: {
    imagePath: 'alter_ego_test_app/CH.png',
    siteLink: 'https://cat-hub-woshipfull.vercel.app',
    repoLink: 'https://github.com/Woshipfull/CatHub',
  },
};

const Homepage = () => {
  const { t } = useTranslation();

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
          backgroundImage: `url(${'https://source.unsplash.com/random'})`,
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
                  {t('homepage.welcome')}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {t('homepage.description')}
                </Typography>
                <Link
                  variant="subtitle1"
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ color: 'yellowgreen', textDecoration: 'none' }}
                >
                  {t('homepage.link')}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <Typography
          variant="h5"
          color="inherit"
          paragraph
          textAlign={'center'}
          sx={{ mb: 4 }}
        >
          {t('homepage.moreProjectsTitle')}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {Object.keys(projects).map((key) => {
            const title = t(`projects.${key}.title`);
            const description = t(`projects.${key}.description`);
            const imageAlt = t(`projects.${key}.imageAlt`);
            const texts = { title, description, imageAlt };

            return <ProjectPost texts={texts} paths={projects[key]} key={key} />
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
