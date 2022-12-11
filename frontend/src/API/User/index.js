import * as api from '../index.js';

export const getProfile = async () => {
  try {
    const result = await api.getProfile();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editProfile = async (input) => {
  try {
    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('first_name', input.firstName);
    formData.append('last_name', input.lastName);
    formData.append('email', input.email);
    formData.append('phone_number', input.phoneNumber);
    if (input.avatar) {
      formData.append('avatar', input.avatar, input.avatar.name);
    }
    const result = await api.editProfile(formData);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getCard = async () => {
  try {
    const result = await api.getCard();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addCard = async (input) => {
  try {
    const result = await api.addCard(input);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};
export const editCard = async (input) => {
  try {
    const result = await api.editCard(input);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const paymentsHistory = async () => {
  try {
    const result = await api.paymentsHistory();
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const paymentsFuture = async () => {
  try {
    const result = await api.paymentsFuture();
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const viewSubscription = async () => {
  try {
    const result = await api.viewSubscription();
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getUserClasses = async () => {
  try {
    const result = await api.getUserClasses();
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};
