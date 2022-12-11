import React, { useContext } from 'react';
import { Grow, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';
import APIContext from '../../context';
import { logout } from '../../API/Auth';

const Navigation = () => {
  const { user, setUser } = useContext(APIContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <Grow in>
      <Box sx={styles.main}>
        <Typography component={Link} sx={styles.link} to='/' variant='h4'>
          Home
        </Typography>
        <Typography component={Link} sx={styles.link} to='studios' variant='h4'>
          Studios
        </Typography>
        <Typography component={Link} sx={styles.link} to='plans' variant='h4'>
          Plans
        </Typography>
        {user ? (
          <Typography
            component={Link}
            sx={styles.link}
            to='profile'
            variant='h4'
          >
            Profile
          </Typography>
        ) : (
          <div style={styles.auth}>
            <Button
              component={Link}
              to='/login'
              variant='contained'
              sx={styles.login}
            >
              Sign In
            </Button>
          </div>
        )}
        {user && (
          <div style={styles.auth}>
            <Button
              component={Link}
              to='/login'
              variant='contained'
              sx={styles.logout}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </Box>
    </Grow>
  );
};

export default Navigation;
