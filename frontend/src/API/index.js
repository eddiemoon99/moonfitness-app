import axios from 'axios';

// create axios instance
const API = axios.create({ baseURL: 'https://moonfitness-api.herokuapp.com' });

// middleware send auth user to backend
API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).access
    }`;
  }
  return req;
});

export const login = (credentials) => API.post('/api/token/', credentials);
export const register = (user) =>
  API.post('/accounts/register/', user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const getProfile = () => API.get('/accounts/profile/');
export const editProfile = (input) => API.put('/accounts/profile/edit/', input);
export const getCard = () => API.get('/accounts/card/view/');
export const addCard = (input) => API.post('/accounts/card/create/', input);
export const editCard = (input) => API.put('/accounts/card/update/', input);
export const paymentsHistory = () => API.get('/accounts/payments-history/');
export const paymentsFuture = () => API.get('/accounts/payments-future/');
export const viewSubscription = () => API.get('/accounts/subscription/view/');
export const getUserClasses = () => API.get('/accounts/class-bookings-list/');
export const getStudios = (latitude, longitude) =>
  API.get(`/studios/all/?latitude=${latitude}&longitude=${longitude}`);
export const getStudiosSearch = (search) =>
  API.get(`/studios/all/filter/?search=${search}`);
export const getStudio = (id) => API.get(`/studios/${id}/`);
export const getStudioClasses = (id) => API.get(`/studios/${id}/classes/`);
export const getStudioClassesSearch = (id, search) =>
  API.get(`/studios/${id}/classes/filter/?search=${search}`);
export const getSubscriptionPlans = () => API.get('/studios/plans/');
export const subscribe = (input, id) =>
  API.post(`/studios/plans/${id}/subscribe/`, input);
export const cancelSubscription = (input) =>
  API.put('/accounts/update-subscription/', input);
export const bookClass = (studio_id, class_id) =>
  API.post(`/studios/${studio_id}/classes/${class_id}/enrol/`, { class_id });
export const dropClass = (studio_id, class_id, class_booking_id) =>
  API.delete(
    `studios/${studio_id}/classes/${class_id}/drop/${class_booking_id}/`
  );
