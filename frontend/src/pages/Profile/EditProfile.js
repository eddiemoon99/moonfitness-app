import React, { useState } from 'react';
import {
  Grow,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import styles from './styles';
import Input from '../../components/Input';
import { editValidate } from '../../utils/validate';
import { editProfile } from '../../API/User';

const EditProfile = ({ userInfo, setUserInfo, handleSwitch }) => {
  const [inputs, setInputs] = useState({
    username: userInfo?.username,
    firstName: userInfo?.first_name,
    lastName: userInfo?.last_name,
    email: userInfo?.email,
    phoneNumber: userInfo?.phone_number,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    setInputs({ ...inputs, avatar: e.target.files[0] });
  };

  const handleCancel = () => {
    setInputs({});
    setErrors({});
    handleSwitch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = editValidate(inputs);
    setErrors(error.errors);
    if (!error.result) {
      const data = editProfile(inputs);
      data.then((res) => {
        if (res.error) {
          setErrors({
            ...errors,
            email: res?.res?.response?.data?.email
              ? 'This email is already taken.'
              : '',
            username: res?.res?.response?.data?.username
              ? 'This username is already taken'
              : '',
            mainError:
              !res?.res?.response?.data?.email && !res?.response?.data?.username
                ? 'Sorry, something went wrong.'
                : '',
          });
        } else {
          setUserInfo({ ...res?.data });
          handleSwitch();
        }
      });
    }
  };
  return (
    <Grow in>
      <Container sx={{ margin: 0 }} maxWidth='xs'>
        <Paper sx={styles.paper}>
          {errors.mainError && (
            <Typography sx={{ marginBottom: '2rem', color: 'red' }}>
              {errors.mainError}
            </Typography>
          )}
          <Typography variant='h5'>Edit Your Profile</Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Grid container spacing={2}>
              <Input
                name='username'
                value={inputs.username}
                label='Username'
                handleChange={handleChange}
                autoFocus
                defaultValue={userInfo?.username}
                half
                error={errors?.username ? true : false}
                errorText={errors?.username}
              />
              <Input
                name='firstName'
                value={inputs.firstName}
                label='First Name'
                handleChange={handleChange}
                defaultValue={userInfo?.first_name}
                half
              />
              <Input
                name='lastName'
                value={inputs.lastName}
                label='Last Name'
                handleChange={handleChange}
                defaultValue={userInfo?.last_name}
                half
              />
              <Input
                name='email'
                value={inputs.email}
                label='Email Address'
                handleChange={handleChange}
                type='email'
                defaultValue={userInfo?.email}
                error={errors?.email ? true : false}
                errorText={errors?.email}
              />
              <Input
                name='phoneNumber'
                value={inputs.phoneNumber}
                label='Phone Number (Format: xxx-xxx-xxxx)'
                handleChange={handleChange}
                type='tel'
                defaultValue={userInfo?.phone_number}
                inputProps={{ pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }}
                error={errors?.phoneNumber ? true : false}
                errorText={errors?.phoneNumber}
              />
              <Grid item xs={12} sm={12}>
                <Typography sx={{ marginBottom: '0.5rem' }}>
                  Avatar: ( jpeg / png / gif )
                </Typography>
                <input
                  type='file'
                  name='avatar'
                  accept='image/jpeg,image/png,image/gif'
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={styles.endButtons}>
              <Button
                sx={{ marginTop: '2rem', marginRight: '0.5rem' }}
                variant='contained'
                color='secondary'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                sx={{ marginTop: '2rem' }}
                type='submit'
                variant='contained'
                color='primary'
              >
                Confirm
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default EditProfile;
