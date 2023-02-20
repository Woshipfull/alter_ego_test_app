import * as React from 'react';
import {
  Link,
  CardMedia,
  CardContent,
  Card,
  Grid,
  Typography,
  CardActions,
} from '@mui/material';

import { useTranslation } from 'react-i18next';

type Props = {
  texts: { title: string; description: string; imageAlt: string };
  paths: { imagePath: string; siteLink: string; repoLink: string };
};

const ProjectPost: React.FC<Props> = ({ texts, paths }) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          display: 'flex',
          height: '100%',
          position: 'relative',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

            zIndex: 10,
          }}
        >
          <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
            {texts.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {texts.description}
          </Typography>

          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link
              variant="subtitle1"
              href={paths.siteLink}
              target="_blank"
              rel="noreferrer"
              color="primary"
              sx={{ textDecoration: 'none' }}
            >
              {texts.title}
            </Link>
            <Link
              variant="subtitle1"
              href={paths.repoLink}
              target="_blank"
              rel="noreferrer"
              color="primary"
              sx={{ textDecoration: 'none', m: 0 }}
            >
              {t('projects.showRepo')}
            </Link>
          </CardActions>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            height: '150%',
            top: 0,
            right: 0,
            position: 'absolute',
            opacity: 0.15,
            objectFit: 'contain',
          }}
          image={paths.imagePath}
          alt={texts.imageAlt}
        />
      </Card>
    </Grid>
  );
};

export default ProjectPost;
