import { createContext, useState } from 'react';

export const useAPIContext = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  return {
    user,
    setUser,
  };
};

const APIContext = createContext({
  user: null,
  setUser: () => {},
});

export default APIContext;
