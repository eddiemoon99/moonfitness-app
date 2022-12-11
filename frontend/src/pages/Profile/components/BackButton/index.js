import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ margin: 'auto' }}
      color='secondary'
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;
