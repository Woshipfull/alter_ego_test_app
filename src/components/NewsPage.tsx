import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectNews,
  getStatus,
  getError,
  fetchNews,
  getStartPoint,
  removeNewsThunk,
} from '../store/newsSlice';
import { AppDispatch } from '../store';
import { News } from '../store/storeTypes';

const NewsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openSnackbar, setOpenSnackbar] = useState(true);

  const newsData = useSelector(selectNews);
  const status = useSelector(getStatus);
  const errors = useSelector(getError);
  const startPoint = useSelector(getStartPoint);

  const addMoreBtnText =
    startPoint < 0
      ? t('newsPage.noMore')
      : status === 'loading'
      ? t('newsPage.loading')
      : t('newsPage.addMore');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddMore = () => {
    if (startPoint < 0) {
      console.log('no more news');
      return;
    }
    dispatch(fetchNews(startPoint));
  };

  const handleRemoveNews = (id: number) => () => dispatch(removeNewsThunk(id));

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const renderNews = (item: News) => {
    const expandId = `news${item.id}`;
    return (
      <Accordion
        key={expandId}
        expanded={expanded === expandId}
        onChange={handleChange(expandId)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
        >
          <Typography textAlign={'justify'}>{item.body}</Typography>
          <Box sx={{ heigth: '100%' }}>
            <IconButton
              sx={{ p: '1px', color: 'red' }}
              onClick={handleRemoveNews(item.id)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews(startPoint));
    }
  }, [dispatch, startPoint, status]);

  useEffect(() => {
    if (errors.length > 0) {
      setOpenSnackbar(true);
    } else {
      setOpenSnackbar(false);
    }
  }, [errors.length]);

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
          backgroundImage: `url(${'/news.jpg'})`,
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
                  {t('newsPage.title')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container sx={{ mb: 2 }}>
        {newsData.map((item: News) => renderNews(item))}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleAddMore}
            variant="contained"
            sx={{ width: { xs: '100%', md: '50%' } }}
            disabled={startPoint < 0}
          >
            {addMoreBtnText}
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errors.length > 0 ? errors[0] : 'Error'}
        action={action}
      />
    </>
  );
};

export default NewsPage;
