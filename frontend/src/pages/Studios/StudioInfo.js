import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getStudio,
  getStudioClasses,
  getStudioClassesSearch,
} from '../../API/Studio';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grow,
  Grid,
  CardMedia,
} from '@mui/material';
import styles from './styles';
import Search from './components/Search';
import ClassCard from './components/ClassCard';
import BackButton from '../Profile/components/BackButton';

const StudioInfo = () => {
  const [studio, setStudio] = useState(null);
  const [classes, setClasses] = useState([]);
  const [mainError, setMainError] = useState('');
  const [search, setSearch] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const result = getStudio(id);
      result.then((res) => {
        if (res.error) {
          setMainError('Something went wrong.');
        } else {
          setStudio(res.data);
        }
      });
      const classes = getStudioClasses(id);
      classes.then((res) => {
        if (res.error) {
          setMainError('Something went wrong.');
        } else {
          setClasses(res.data.results);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const result = getStudioClassesSearch(id, search);
    result.then((res) => {
      setClasses(res.data.results);
    });
  }, [search, id]);

  const amenitiesString = (amenities) => {
    let result = '';
    if (amenities) {
      amenities.map((amenity) => {
        result = result.concat(`${amenity.type} (${amenity.quantity}), `);
      });
    }
    result = result.slice(0, -2);
    return result;
  };

  return (
    <Grow in>
      <Box>
        {mainError && <Typography>{mainError}</Typography>}
        <Box sx={styles.infoMain}>
          <Box sx={styles.infoBox}>
            <List>
              <ListItem>
                <ListItemText primary={studio?.name} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary='Address' secondary={studio?.address} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary='Postal Code'
                  secondary={studio?.postal_code}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary='Phone Number'
                  secondary={studio?.phone_number}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary='Amenities'
                  secondary={amenitiesString(studio?.amenities)}
                />
              </ListItem>
              <Divider />
              <ListItem
                component='a'
                target='_blank'
                href={`https://www.google.com/maps/dir/?api=1&destination=${studio?.point?.latitude},${studio?.point?.longitude}`}
              >
                <ListItemText
                  sx={{ textAlign: 'center', color: 'blue', cursor: 'pointer' }}
                  primary='Directions'
                />
              </ListItem>
            </List>
          </Box>
          {studio?.images && (
            <Grid
              container
              alignItems='stretch'
              spacing={2}
              sx={{ marginLeft: '1rem' }}
            >
              {studio?.images.map((image, index) => (
                <Grid
                  key={`${index}-${image.image}`}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                >
                  <CardMedia
                    sx={{
                      height: 0,
                      paddingTop: '56.25%',
                      backgroundBlendMode: 'darken',
                    }}
                    image={image.image}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box sx={{ margin: '2rem 0', textAlign: 'center' }}>
          <BackButton />
        </Box>

        <Typography
          variant='h6'
          sx={{ textAlign: 'center', marginBottom: '-2rem' }}
        >
          Search classes:
        </Typography>
        <Search setSearch={setSearch} />
        {classes.length !== 0 && (
          <Grid container alignItems='stretch' spacing={2}>
            {classes.map((studioclass) => (
              <Grid key={studioclass.id} item xs={12} sm={3} md={3}>
                <ClassCard studio_id={studio?.id} studioclass={studioclass} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box></Box>
      </Box>
    </Grow>
  );
};

export default StudioInfo;
