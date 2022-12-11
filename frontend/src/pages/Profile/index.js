import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../API/User';
import {
  Typography,
  Box,
  List,
  ListItem,
  Container,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Grow,
} from '@mui/material';
import styles from './styles';

import EditProfile from './EditProfile';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [mainError, setMainError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const result = getProfile();
    result.then((res) => {
      if (res.status === 200) {
        setUserInfo(res.data);
        setMainError('');
      } else {
        setMainError('Oops, something went wrong.');
      }
    });
  }, []);

  const handleSwitch = () => {
    setIsEdit((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {mainError && <Typography>{mainError}</Typography>}
      <Grow in>
        <Container sx={styles.main}>
          {!isEdit ? (
            <div>
              <Box sx={styles.infoBox}>
                <List>
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt='avatar' src={userInfo?.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ margin: 'auto' }}
                      primary={userInfo?.username}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={`${userInfo?.first_name} ${userInfo?.last_name}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={userInfo?.email} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={userInfo?.phone_number} />
                  </ListItem>
                </List>
              </Box>
              <Button
                sx={{
                  marginTop: '1rem',
                  backgroundColor: '#29677d',
                  textTransform: 'unset',
                }}
                fullWidth
                variant='contained'
                onClick={handleSwitch}
              >
                Edit Your Profile
              </Button>
            </div>
          ) : (
            <EditProfile
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              handleSwitch={handleSwitch}
            />
          )}
          <Box sx={styles.yourButtons}>
            <Button
              component={Link}
              to='card'
              sx={{
                marginTop: '1rem',
                backgroundColor: '#29677d',
                textTransform: 'unset',
              }}
              variant='contained'
            >
              Your Card
            </Button>
            <Button
              component={Link}
              to='payments'
              sx={{
                marginTop: '1rem',
                backgroundColor: '#29677d',
                textTransform: 'unset',
              }}
              variant='contained'
            >
              Your Payments
            </Button>
            <Button
              component={Link}
              to='subscription'
              sx={{
                marginTop: '1rem',
                backgroundColor: '#29677d',
                textTransform: 'unset',
              }}
              variant='contained'
            >
              Your Subscription
            </Button>
            <Button
              component={Link}
              to='classes'
              sx={{
                marginTop: '1rem',
                backgroundColor: '#29677d',
                textTransform: 'unset',
              }}
              variant='contained'
            >
              Your Classes!
            </Button>
          </Box>
        </Container>
      </Grow>
    </>
  );
};

export default Profile;
