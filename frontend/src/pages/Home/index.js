import React from 'react';
import { Box, Typography, Grow } from '@mui/material';
import styles from './styles';

const Home = () => {
  return (
    <Grow in>
      <Box sx={styles.welcome}>
        <Box
          sx={{
            width: 'fit-content',
            margin: '4rem auto',
            backdropFilter: 'brightness(60%)',
            borderRadius: '2%',
          }}
        >
          <Typography sx={styles.welcomeText} variant='h1'>
            Welcome
          </Typography>

          <Typography
            variant='h5'
            sx={{
              ...styles.welcomeText,
              marginBottom: '4rem',
            }}
          >
            Moon Fitness Club
          </Typography>
        </Box>
      </Box>
    </Grow>
  );
};

export default Home;
