import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
  Grow,
} from '@mui/material';
import styles from './styles';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { cancelSubscription } from '../../../../API/Studio';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const EditPlanCard = ({ plan, subscription }) => {
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState('');
  const [toast, setToast] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setModalError('');
  };

  const handleClick = () => {
    setToast(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
  };

  const handleSubscribe = () => {
    const now = new Date();
    const later = new Date();
    later.setDate(later.getDate() + plan.duration);
    const year = now.toLocaleString('default', { year: 'numeric' });
    const month = now.toLocaleString('default', { month: '2-digit' });
    const day = now.toLocaleString('default', { day: '2-digit' });
    const yearLater = later.toLocaleString('default', { year: 'numeric' });
    const monthLater = later.toLocaleString('default', { month: '2-digit' });
    const dayLater = later.toLocaleString('default', { day: '2-digit' });
    const startDate = year + '-' + month + '-' + day;
    const nextDate = yearLater + '-' + monthLater + '-' + dayLater;
    const input = {
      start_date: startDate,
      next_date: nextDate,
      price: plan?.price,
      duration: plan?.duration,
    };
    const result = cancelSubscription(input);
    result.then((res) => {
      if (res.error) {
        setModalError(res?.res?.response?.data?.detail);
      } else {
        handleOpen();
        handleClick();
      }
    });
  };
  return (
    <Grow in>
      <Box>
        <Box sx={styles.editPlanCard}>
          <List sx={{ textAlign: 'center' }}>
            <ListItem>
              <ListItemText
                sx={{ textAlign: 'center' }}
                primary='Subscribe for:'
                secondary={`${plan.duration} days`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                sx={{ textAlign: 'center' }}
                primary='Price'
                secondary={`$${plan?.price}`}
              />
            </ListItem>
            <Divider />
            <ListItem
              onClick={handleOpen}
              sx={{ backgroundColor: 'grey', cursor: 'pointer' }}
            >
              <ListItemText
                sx={{ textAlign: 'center', color: 'lightblue' }}
                primary='Choose this plan!'
              />
            </ListItem>
          </List>
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
                sx={{ color: 'red', textAlign: 'center', marginBottom: '2rem' }}
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
              <Button color='error' onClick={handleOpen}>
                Cancel
              </Button>
              <Button onClick={handleSubscribe}>Confirm</Button>
            </Box>
          </Box>
        </Modal>
        <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Change successful!
          </Alert>
        </Snackbar>
      </Box>
    </Grow>
  );
};

export default EditPlanCard;
