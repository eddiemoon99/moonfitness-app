const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgb(182 172 156)',
    padding: '1rem',
    boxShadow: '0 3px #888888',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: 'purple',
    },
    '&:active': {
      color: 'purple',
    },
  },
  auth: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  login: {
    backgroundColor: '#baab82',
    height: '50%',
    padding: 'auto',
  },
  logout: {
    backgroundColor: 'red',
    height: '50%',
    // padding: 'auto',
  },
};

export default styles;
