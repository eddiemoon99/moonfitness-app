import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Grow, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getUserClasses } from '../../../../API/User';
import styles from './styles';
import BackButton from '../BackButton';
import { dropClass } from '../../../../API/Studio';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const UserClasses = () => {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState('');
  const [toast, setToast] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    const result = getUserClasses();
    result.then((res) => {
      if (res.error) {
        console.log('Sorry, something went wrong.');
      } else {
        setClasses(res.data.results);
      }
    });
  }, []);

  const handleOpen = (row) => {
    setOpen((prev) => !prev);
    setModalError('');
    setCurrentRow(row);
  };

  const handleCloseModal = () => {
    setOpen((prev) => !prev);
    setModalError('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
  };

  const handleDrop = () => {
    const class_booking_id = currentRow?.id;
    const class_id = currentRow?.studio_class?.id;
    const studio_id = currentRow?.studio_class?.studio;
    const result = dropClass(studio_id, class_id, class_booking_id);
    result.then((res) => {
      if (res.error) {
        setModalError('Sorry, something went wrong.');
      } else {
        handleCloseModal();
        setToast(true);
      }
    });
  };

  const timeConvert = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  const dateConvert = (time) => {
    return new Date(time).toDateString();
  };

  return (
    <Grow in>
      <Box>
        <Typography variant='h5' sx={{ textAlign: 'center', margin: '2rem 0' }}>
          Your classes:
        </Typography>
        {console.log('classes: ', classes)}
        {console.log('curernt row: ', currentRow)}
        <TableContainer
          sx={{
            maxWidth: 800,
            minWidth: 800,
            backgroundColor: 'grey',
            margin: 'auto',
            marginBottom: '4rem',
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 800 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>Class Name</TableCell>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Start Time</TableCell>
                <TableCell align='right'>End Time</TableCell>
                <TableCell align='right'>Coach</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            {classes && (
              <TableBody>
                {classes.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='right'>
                      {row.studio_class?.name}
                    </TableCell>
                    <TableCell align='right'>
                      {`${dateConvert(row.studio_class?.start_time)}`}
                    </TableCell>
                    <TableCell align='right'>
                      {`${timeConvert(row.studio_class?.start_time)}`}
                    </TableCell>
                    <TableCell align='right'>
                      {`${timeConvert(row.studio_class?.end_time)}`}
                    </TableCell>
                    <TableCell align='right'>
                      {row.studio_class?.coach}
                    </TableCell>
                    <TableCell sx={{ color: 'blue' }} align='right'>
                      <Button onClick={() => handleOpen(row)} color='error'>
                        Drop class
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleCloseModal}
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
              <Button color='info' onClick={handleCloseModal}>
                Back
              </Button>
              <Button color='error' onClick={handleDrop}>
                Cancel Class
              </Button>
            </Box>
          </Box>
        </Modal>
        <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Class successfully dropped.
          </Alert>
        </Snackbar>
        <Box sx={{ textAlign: 'center' }}>
          <BackButton />
        </Box>
      </Box>
    </Grow>
  );
};

export default UserClasses;
