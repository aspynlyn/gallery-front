import axios from './httpRequester';
axios.defaults.baseURL = '/api/v1';

export const getItems = () => {
  return axios.get('/item').catch((e) => e.response);
};
