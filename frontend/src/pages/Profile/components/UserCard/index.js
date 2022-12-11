import {
  Grow,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getCard } from '../../../../API/User';
import styles from './styles';
import EditCard from './EditCard';
import AddCard from './AddCard';
import BackButton from '../BackButton';

const UserCard = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [mainError, setMainError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [cardExists, setCardExists] = useState(false);

  useEffect(() => {
    const result = getCard();
    result.then((res) => {
      if (res?.response?.status === 404) {
        setMainError('No card on file. Please add one!');
        setCardExists(false);
      } else {
        setCardInfo(res.data);
        setCardExists(true);
      }
    });
  }, []);

  const handleSwitch = () => {
    setIsEdit((prev) => {
      return !prev;
    });
  };

  const handleSwitchAdd = () => {
    setIsAdd((prev) => {
      return !prev;
    });
  };

  return (
    <Grow in>
      <Container sx={styles.main}>
        {cardExists ? (
          !isEdit ? (
            <>
              <Box sx={styles.infoBox}>
                <List>
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Card Number'
                      secondary={cardInfo?.card_number}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Name'
                      secondary={`${cardInfo?.first_name} ${cardInfo?.last_name}`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Address'
                      secondary={cardInfo?.address}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Phone Number'
                      secondary={cardInfo?.phone_number}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='Card Expiry'
                      secondary={cardInfo?.card_expiry}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary='CVV'
                      secondary={cardInfo?.card_cvv}
                    />
                  </ListItem>
                  <Divider />
                </List>
              </Box>
              <Button
                sx={{
                  margin: 'auto',
                  backgroundColor: '#29677d',
                  textTransform: 'unset',
                  width: '30%',
                }}
                variant='contained'
                onClick={handleSwitch}
              >
                Edit Your Card
              </Button>
              <BackButton />
            </>
          ) : (
            <EditCard
              cardInfo={cardInfo}
              setCardInfo={setCardInfo}
              handleSwitch={handleSwitch}
            />
          )
        ) : !isAdd ? (
          <>
            {mainError && (
              <Typography sx={{ margin: '2rem auto' }}>{mainError}</Typography>
            )}
            <Button
              sx={{
                margin: '2rem auto',
                backgroundColor: '#29677d',
                textTransform: 'unset',
                width: '30%',
              }}
              variant='contained'
              onClick={handleSwitchAdd}
            >
              Add Your Card
            </Button>
            <BackButton />
          </>
        ) : (
          <AddCard handleSwitchAdd={handleSwitchAdd} />
        )}
      </Container>
    </Grow>
  );
};

export default UserCard;
