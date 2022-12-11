import * as api from '../index.js';

export const getStudios = async ({ latitude, longitude }) => {
  try {
    const result = await api.getStudios(latitude, longitude);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getStudiosSearch = async (setLoading, search) => {
  try {
    const result = await api.getStudiosSearch(search);
    setLoading(false);
    return result;
  } catch (error) {
    console.log(error);
    setLoading(false);
    return { error: true, res: error };
  }
};

export const getStudio = async (id) => {
  try {
    const result = await api.getStudio(id);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getStudioClasses = async (id) => {
  try {
    const result = await api.getStudioClasses(id);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getStudioClassesSearch = async (id, search) => {
  try {
    const result = await api.getStudioClassesSearch(id, search);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const getSubscriptionPlans = async () => {
  try {
    const result = await api.getSubscriptionPlans();
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const subscribe = async (input, id) => {
  try {
    const result = await api.subscribe(input, id);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const cancelSubscription = async (input) => {
  try {
    const result = await api.cancelSubscription(input);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const bookClass = async (studio_id, class_id) => {
  try {
    const result = await api.bookClass(studio_id, class_id);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};

export const dropClass = async (studio_id, class_id, class_booking_id) => {
  try {
    const result = await api.dropClass(studio_id, class_id, class_booking_id);
    return result;
  } catch (error) {
    console.log(error);
    return { error: true, res: error };
  }
};
