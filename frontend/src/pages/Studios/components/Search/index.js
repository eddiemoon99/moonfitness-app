import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ setSearch }) => {
  const [searchHold, setSearchHold] = useState('');
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextField
        sx={{ margin: '3.5rem 0 4rem 0', backgroundColor: '#fff' }}
        label='Search'
        onKeyDown={keyPress}
        onChange={(e) => setSearchHold(e.target.value)}
      ></TextField>
      <IconButton
        onClick={() => setSearch(searchHold)}
        type='button'
        sx={{}}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default Search;
