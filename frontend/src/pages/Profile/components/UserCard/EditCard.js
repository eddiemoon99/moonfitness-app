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
import Input from '../../../../components/Input';
import { editCard } from '../../../../API/User';

const EditCard = ({ cardInfo, setCardInfo, handleSwitch }) => {
  const [inputs, setInputs] = useState({ ...cardInfo });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleCancel = () => {
    setInputs({});
    setErrors({});
    handleSwitch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = editCard(inputs);
    result.then((res) => {
      if (res.error) {
        setErrors({ ...errors, mainError: 'Something went wrong.' });
      } else {
        setCardInfo({ ...res?.data });
        handleSwitch();
      }
    });
  };

  return (
    <Grow in>
      <Container sx={{ margin: 'auto' }} maxWidth='xs'>
        <Paper sx={styles.paper}>
          {errors.mainError && (
            <Typography sx={{ marginBottom: '2rem', color: 'red' }}>
              {errors.mainError}
            </Typography>
          )}
          <Typography variant='h5'>Edit Your Card</Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Grid container spacing={2}>
              <Input
                name='card_number'
                value={inputs.card_number}
                label='Card Number'
                handleChange={handleChange}
                autoFocus
                defaultValue={cardInfo?.card_number}
                half
                error={errors?.card_number ? true : false}
                errorText={errors?.card_number}
              />
              <Input
                name='first_name'
                value={inputs.first_name}
                label='First Name'
                handleChange={handleChange}
                defaultValue={cardInfo?.first_name}
                half
              />
              <Input
                name='last_name'
                value={inputs.last_name}
                label='Last Name'
                handleChange={handleChange}
                defaultValue={cardInfo?.last_name}
                half
              />
              <Input
                name='address'
                value={inputs.address}
                label='Address'
                handleChange={handleChange}
                type='text'
                defaultValue={cardInfo?.address}
                error={errors?.address ? true : false}
                errorText={errors?.address}
              />
              <Input
                name='phone_number'
                value={inputs.phone_number}
                label='Phone Number (Format: xxx-xxx-xxxx)'
                handleChange={handleChange}
                type='tel'
                defaultValue={cardInfo?.phone_number}
                inputProps={{ pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }}
                error={errors?.phone_number ? true : false}
                errorText={errors?.phone_number}
              />
              <Input
                name='card_expiry'
                value={inputs.card_expiry}
                label='Card Expiry (Format: yyyy-mm-dd)'
                handleChange={handleChange}
                type='text'
                defaultValue={cardInfo?.card_expiry}
                inputProps={{ pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}' }}
                error={errors?.card_expiry ? true : false}
                errorText={errors?.card_expiry}
              />
              <Input
                name='card_cvv'
                value={inputs.card_cvv}
                label='CVV (Format: xxx)'
                handleChange={handleChange}
                type='text'
                defaultValue={cardInfo?.card_cvv}
                inputProps={{ pattern: '[0-9]{3}' }}
                error={errors?.card_cvv ? true : false}
                errorText={errors?.card_cvv}
              />
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

export default EditCard;
