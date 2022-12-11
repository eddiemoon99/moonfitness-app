import React, { useState, useEffect } from 'react';
import { paymentsFuture, paymentsHistory } from '../../../../API/User';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import BackButton from '../BackButton';
import Grow from '@mui/material/Grow';
const UserPayments = () => {
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState(null);
  const [mainError, setMainError] = useState('');
  useEffect(() => {
    const history = paymentsHistory();
    const future = paymentsFuture();
    history.then((res) => {
      if (res.error) {
        setMainError('Sorry, something went wrong');
      } else {
        setHistory(res.data.results);
      }
    });
    future.then((res) => {
      if (res.error) {
        setMainError('Sorry, something went wrong');
      } else {
        setFuture(res.data);
      }
    });
  }, []);

  const displayDate = (date) => {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return year + '-' + month + '-' + day;
  };

  return (
    <Grow in>
      <div>
        {console.log('history: ', history)}
        {console.log('future: ', future)}
        <Typography variant='h5' sx={{ textAlign: 'center', margin: '2rem 0' }}>
          Your Payments History:
        </Typography>
        <TableContainer
          sx={{
            maxWidth: 500,
            minWidth: 500,
            backgroundColor: 'grey',
            margin: 'auto',
            marginBottom: '4rem',
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 500 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Card Number</TableCell>
                <TableCell align='right'>Amount ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>
                    {displayDate(new Date(row.date))}
                  </TableCell>
                  <TableCell align='right'>{row.card.card_number}</TableCell>
                  <TableCell align='right'>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant='h5' sx={{ textAlign: 'center', margin: '2rem 0' }}>
          Your Upcoming Payment:
        </Typography>
        <TableContainer
          sx={{
            maxWidth: 400,
            minWidth: 300,
            backgroundColor: '#cfb87a',
            margin: 'auto',
            marginBottom: '4rem',
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 300 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Amount ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='right'>{future?.next_date}</TableCell>
                <TableCell align='right'>{future?.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: 'center' }}>
          <BackButton />
        </Box>
      </div>
    </Grow>
  );
};

export default UserPayments;
