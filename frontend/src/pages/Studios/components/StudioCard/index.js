import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const StudioCard = ({ studio }) => {
  const navigate = useNavigate();
  const handleStudioClick = () => {
    navigate(`${studio.id}`);
  };
  return (
    <Card
      sx={{ cursor: 'pointer', backgroundColor: '#d3dee3' }}
      onClick={handleStudioClick}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '56.25%',
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'darken',
        }}
        image={studio?.images[0]?.image}
        title={studio.name}
      />
      <Typography sx={{ textAlign: 'center' }} variant='h6'>
        {studio.name}
      </Typography>
      <CardContent>
        <Typography
          variant='body2'
          color='textPrimary'
          component='i'
          sx={{ textAlign: 'center' }}
        >
          {studio.address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StudioCard;
