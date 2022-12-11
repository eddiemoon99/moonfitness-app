import * as api from '../index.js';

export const login = async (credentials) => {
  try {
    const { data } = await api.login(credentials);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
};

export const register = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('first_name', credentials.firstName);
    formData.append('last_name', credentials.lastName);
    formData.append('email', credentials.email);
    formData.append('phone_number', credentials.phoneNumber);
    formData.append('password', credentials.password);
    if (credentials.avatar) {
      formData.append('avatar', credentials.avatar, credentials.avatar.name);
    }

    const { data } = await api.register(formData);
    return data;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};
