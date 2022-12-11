import React, { useState, useEffect } from 'react';
import { getStudios, getStudiosSearch } from '../../API/Studio';
import { Box, CircularProgress, Grid, Grow } from '@mui/material';
import styles from './styles';
import StudioCard from './components/StudioCard';
import Search from './components/Search';

const defaultTorontoCoords = {
  latitude: '43.651070',
  longitude: '-79.347015',
};

const Studios = () => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [studios, setStudios] = useState([]);
  const [search, setSearch] = useState('');
  // get user location
  useEffect(() => {
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition((position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation({ ...userLocation });
        setLocationAllowed(true);
      });
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          setLocation({ ...defaultTorontoCoords });
          setLocationAllowed(false);
        }
      });
    } else {
      setLocationAllowed(false);
    }
  }, []);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const result = getStudios(location);
      result.then((res) => {
        setStudios(res.data.results);
      });
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const result = getStudiosSearch(setLoading, search);
    result.then((res) => {
      setStudios(res.data.results);
    });
  }, [search]);

  return (
    <Grow in>
      <Box sx={styles.main}>
        <Search setSearch={setSearch} />
        {loading && <CircularProgress sx={styles.loader} />}
        {studios?.length !== 0 && (
          <Grid
            sx={styles.studiosGrid}
            container
            alignItems='stretch'
            spacing={2}
          >
            {studios.map((studio) => (
              <Grid key={studio.id} item xs={12} sm={6} md={3}>
                <StudioCard studio={studio} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Grow>
  );
};

export default Studios;
