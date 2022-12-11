import React, { useState, useEffect } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import { getSubscriptionPlans } from '../../API/Studio';
import PlanCard from './components/PlanCard';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const result = getSubscriptionPlans();
    result.then((res) => {
      if (res.error) {
        console.log('error: ', res.error);
      } else {
        setPlans(res.data.results);
      }
    });
  }, []);

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
            {plans.map((plan, index) => (
              <Grid
                sx={{ marginBottom: '2rem', minWidth: '350px' }}
                key={plan.id}
                item
                xs={12}
                sm={12}
                md={12}
              >
                <PlanCard key={plan.id} plan={plan} />
              </Grid>
            ))}
          </Box>
        )}
      </Box>
    </Grow>
  );
};

export default Plans;
