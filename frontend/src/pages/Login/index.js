import {
  Container,
  Grow,
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import styles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../../components/Input';
import { login, register } from '../../API/Auth';
import { registerValidate } from '../../utils/validate';
import { useNavigate } from 'react-router-dom';
import APIContext from '../../context';

const defaultInputs = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(APIContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      const error = registerValidate(inputs);
      setErrors(error.errors);
      if (!error.result) {
        const data = register(inputs);
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
                !res?.res?.response?.data?.email &&
                !res?.res?.response?.data?.username
                  ? 'Sorry, something went wrong.'
                  : '',
            });
          } else {
            setIsSignUp(false);
            setSuccess(true);
            setErrors({});
          }
        });
      }
    } else {
      const data = login(inputs);
      data.then((res) => {
        if (res?.response?.status === 401) {
          setErrors({
            ...errors,
            mainError: 'Username or password is incorrect.',
          });
        } else {
          localStorage.setItem('user', JSON.stringify(res));
          setUser(res);
          setErrors({});
          navigate('/');
        }
      });
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    setInputs({ ...inputs, avatar: e.target.files[0] });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    setShowPassword(false);
    setInputs(defaultInputs);
    setErrors({});
    setSuccess(false);
  };

  return (
    <Grow in>
      <Container sx={styles.main} component='main' maxWidth='xs'>
        <Paper sx={styles.paper}>
          {success && (
            <Typography sx={{ marginBottom: '2rem' }}>
              Registration successful! You may now sign in.
            </Typography>
          )}
          {errors.mainError && (
            <Typography sx={{ marginBottom: '2rem', color: 'red' }}>
              {errors.mainError}
            </Typography>
          )}
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Grid container spacing={2}>
              <Input
                name='username'
                value={inputs.username}
                label='Username'
                handleChange={handleChange}
                autoFocus
                half
                required
                error={errors?.username ? true : false}
                errorText={errors?.username}
              />
              {isSignUp && (
                <>
                  <Input
                    name='firstName'
                    value={inputs.firstName}
                    label='First Name'
                    handleChange={handleChange}
                    required
                    half
                  />
                  <Input
                    name='lastName'
                    value={inputs.lastName}
                    label='Last Name'
                    handleChange={handleChange}
                    required
                    half
                  />
                  <Input
                    name='email'
                    value={inputs.email}
                    label='Email Address'
                    handleChange={handleChange}
                    type='email'
                    required
                    error={errors?.email ? true : false}
                    errorText={errors?.email}
                  />
                  <Input
                    name='phoneNumber'
                    value={inputs.phoneNumber}
                    label='Phone Number (Format: xxx-xxx-xxxx)'
                    handleChange={handleChange}
                    type='tel'
                    required
                    inputProps={{ pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }}
                    error={errors?.phoneNumber ? true : false}
                    errorText={errors?.phoneNumber}
                  />
                </>
              )}

              <Input
                name='password'
                value={inputs.password}
                label='Password'
                handleChange={handleChange}
                required
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
                error={errors?.password ? true : false}
                errorText={errors?.password}
              />
              {isSignUp && (
                <>
                  <Input
                    name='confirmPassword'
                    value={inputs.confirmPassword}
                    label='Confirm Password'
                    handleChange={handleChange}
                    required
                    type={showPassword ? 'text' : 'password'}
                    handleShowPassword={handleShowPassword}
                    error={errors?.confirmPassword ? true : false}
                    errorText={errors?.confirmPassword}
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
                </>
              )}
            </Grid>
            <Button
              sx={{ marginTop: '2rem' }}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid
              container
              sx={{ marginTop: '1rem', justifyContent: 'flex-end' }}
            >
              <Grid item>
                <Button onClick={handleSwitch} color='primary'>
                  {isSignUp
                    ? 'Already have an account?'
                    : "Don't have an account? Sign up here"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Login;
