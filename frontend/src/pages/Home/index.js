import React from 'react';
import { Box, Typography, Grow } from '@mui/material';
import styles from './styles';

const Home = () => {
  return (
    <Grow in>
      <Box sx={styles.welcome}>
        <Typography sx={styles.welcomeText} variant='h1'>
          Welcome
        </Typography>
        <Typography
          variant='h5'
          sx={{ ...styles.welcomeText, marginBottom: '4rem' }}
        >
          Toronto Fitness Club
        </Typography>
      </Box>
    </Grow>
  );
};

export default Home;
