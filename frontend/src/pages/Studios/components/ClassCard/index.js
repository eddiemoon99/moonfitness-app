import React, { useState, useContext } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Grow,
  Button,
} from '@mui/material';
import styles from './styles';
import APIContext from '../../../../context';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { bookClass } from '../../../../API/Studio';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const ClassCard = ({ studio_id, studioclass }) => {
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState('');
  const [toast, setToast] = useState(false);
  const { user } = useContext(APIContext);
  const handleBook = () => {
    const result = bookClass(studio_id, studioclass?.id);
    result.then((res) => {
      if (res.error) {
        setModalError(res?.res?.response?.data?.detail);
      } else {
        handleOpen();
        handleClick();
      }
    });
  };

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

  const timeConvert = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  const dateConvert = (time) => {
    return new Date(time).toDateString();
  };

  return (
    <Grow in>
      <Box sx={styles.infoBox}>
        {console.log('studio class id : ', studioclass?.id)}
        {console.log('studio_id: ', studio_id)}
        <List sx={{ textAlign: 'center' }}>
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary={studioclass?.name}
              secondary={studioclass?.description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Taught By: '
              secondary={studioclass?.coach}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Date'
              secondary={dateConvert(studioclass?.start_time)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Start Time'
              secondary={timeConvert(studioclass?.start_time)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='End Time'
              secondary={timeConvert(studioclass?.end_time)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Capacity'
              secondary={studioclass?.capacity}
            />
          </ListItem>
          {user && (
            <ListItem
              onClick={handleOpen}
              sx={{ backgroundColor: 'grey', cursor: 'pointer' }}
            >
              <ListItemText
                sx={{ textAlign: 'center', color: 'lightblue' }}
                primary='Join this class!'
              />
            </ListItem>
          )}
        </List>
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
              Confirm your booking
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Button color='error' onClick={handleOpen}>
                Cancel
              </Button>
              <Button onClick={handleBook}>Confirm</Button>
            </Box>
          </Box>
        </Modal>
        <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Booking successful!
          </Alert>
        </Snackbar>
      </Box>
    </Grow>
  );
};

export default ClassCard;
