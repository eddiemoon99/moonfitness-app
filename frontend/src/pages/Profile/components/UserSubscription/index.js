import {
  Box,
  Typography,
  Grow,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { viewSubscription } from '../../../../API/User';
import { Link } from 'react-router-dom';
import styles from './styles';
import { cancelSubscription } from '../../../../API/Studio';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BackButton from '../BackButton';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const UserSubscription = () => {
  const [subscription, setSubscription] = useState({});
  const [mainError, setMainError] = useState('');
  const [modalError, setModalError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const result = viewSubscription();
    result.then((res) => {
      if (res.error) {
        if (res?.res?.response?.status === 404) {
          setMainError('You have no active subscription plan.');
        }
      } else {
        setSubscription(res.data);
        setInitialLoad(false);
      }
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleCancel = () => {
    const input = { ...subscription, status: 'cancelled' };
    const result = cancelSubscription(input);
    result.then((res) => {
      if (res.error) {
        setModalError('Sorry, something went wrong.');
      } else {
        handleOpen();
        setToast(true);
      }
    });
  };
  return (
    <Grow in>
      <Box>
        {mainError && (
          <Typography
            sx={{ color: 'red', textAlign: 'center', margin: '2rem' }}
          >
            {mainError}
          </Typography>
        )}
        {(!subscription || (!initialLoad && !subscription?.status)) && (
          <Typography sx={{ textAlign: 'center', margin: '2rem' }}>
            No active subscription! Click <Link to='/plans'>here</Link> to see
            the plans.
          </Typography>
        )}
        {subscription?.status && (
          <Grow in>
            <Box>
              <Typography sx={{ textAlign: 'center', margin: '2rem' }}>
                Your Current Subscription:
              </Typography>
              <Box sx={styles.infoBox}>
                <List>
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Start Date'
                      secondary={subscription?.start_date}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Duration'
                      secondary={subscription?.duration}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Next Payment'
                      secondary={subscription?.next_date}
                    />
                  </ListItem>
                  <Divider />

                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Price'
                      secondary={subscription?.price}
                    />
                  </ListItem>
                </List>
              </Box>
              <Box sx={{ textAlign: 'center', padding: '2rem' }}>
                <Button
                  sx={{ marginRight: '1rem' }}
                  variant='contained'
                  color='error'
                  onClick={handleOpen}
                >
                  Cancel Your Subscription
                </Button>
                <Button component={Link} to='/plans/edit' variant='contained'>
                  Switch to another plan
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <BackButton />
              </Box>
              <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={styles.modal}>
                  {modalError && (
                    <Typography
                      sx={{
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '2rem',
                      }}
                    >
                      {modalError}
                    </Typography>
                  )}
                  <Typography
                    sx={{ textAlign: 'center', marginBottom: '2rem' }}
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                  >
                    Confirm your choice
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button color='info' onClick={handleOpen}>
                      Back
                    </Button>
                    <Button color='error' onClick={handleCancel}>
                      Cancel Subscription
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Snackbar
                open={toast}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity='success'
                  sx={{ width: '100%' }}
                >
                  Cancellation successful.
                </Alert>
              </Snackbar>
            </Box>
          </Grow>
        )}
      </Box>
    </Grow>
  );
};

export default UserSubscription;
