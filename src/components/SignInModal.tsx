/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import {
  Collapse,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  MenuItem,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logIn } from '../store/appStateSlice';

type Props = {
  placement: 'navbar' | 'menu';
  handleCloseMenu: () => void;
};

const SignInModal: React.FC<Props> = ({ placement, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const validationSchema = yup.object({
    username: yup.string().required(() => t('loginModal.validErrorMessage')),
    password: yup.string().required(() => t('loginModal.validErrorMessage')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      if (username === 'admin' && password === '12345') {
        localStorage.setItem('username', username);
        dispatch(logIn());
        navigate('/profile');
        handleCloseModal();
        setOpenAlert(false);
      } else {
        setOpenAlert(true);
      }
    },
  });

  const handleClickOpenModal = () => {
    handleCloseMenu();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    formik.handleReset(true);
    setOpenAlert(false);
    setOpenModal(false);
  };

  return (
    <>
      {placement === 'navbar' ? (
        <Button
          onClick={handleClickOpenModal}
          sx={{ my: 2, display: 'block', color: 'white' }}
        >
          {t('loginModal.btnOpen')}
        </Button>
      ) : (
        <MenuItem onClick={handleClickOpenModal}>
          <Typography textAlign="center">{t('loginModal.btnOpen')}</Typography>
        </MenuItem>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{t('loginModal.title')}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label={t('loginModal.usernameLabel')}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mt: 1, mb: 1 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label={t('loginModal.passwordLabel')}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 1 }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              {t('loginModal.submitBtn')}
            </Button>
          </form>

          <Collapse in={openAlert} sx={{ mt: 2 }}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {t('loginModal.submitErrorMessage')}
            </Alert>
          </Collapse>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInModal;
