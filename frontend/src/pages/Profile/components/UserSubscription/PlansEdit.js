import React, { useState, useEffect } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import { getSubscriptionPlans } from '../../../../API/Studio';
import { viewSubscription } from '../../../../API/User';
import EditPlanCard from './EditPlanCard';
import BackButton from '../BackButton';

const PlansEdit = () => {
  const [plans, setPlans] = useState([]);
  const [mainError, setMainError] = useState('');
  const [subscription, setSubscription] = useState({});

  useEffect(() => {
    const result = viewSubscription();
    result.then((res) => {
      if (res.error) {
        setMainError('Something went wrong.');
      } else {
        setSubscription(res.data);
      }
    });
  }, []);

  useEffect(() => {
    const result = getSubscriptionPlans();
    result.then((res) => {
      if (res.error) {
        setMainError('Something went wrong.');
      } else {
        setPlans(res.data.results);
      }
    });
  }, []);

  const filterPlans = (plans) => {
    const newPlans = plans.filter((plan) => {
      return (
        plan?.price !== subscription?.price ||
        plan?.duration !== subscription?.duration
      );
    });
    return newPlans;
  };
  return (
    <Grow in>
      <Box sx={{ margin: '2rem 2rem' }}>
        {plans.length !== 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            alignItems='center'
            justifyContent='center'
          >
            {filterPlans(plans).map((plan, index) => (
              <Grid
                sx={{ marginBottom: '2rem', minWidth: '350px' }}
                key={plan.id}
                item
                xs={12}
                sm={12}
                md={12}
              >
                <EditPlanCard
                  subscription={subscription}
                  key={plan.id}
                  plan={plan}
                />
              </Grid>
            ))}
          </Box>
        )}
        <Box sx={{ textAlign: 'center' }}>
          <BackButton />
        </Box>
      </Box>
    </Grow>
  );
};

export default PlansEdit;
