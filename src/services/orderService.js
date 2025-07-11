import axios from './httpRequester';

const path = '/order';

export const addOrder = (args) => {
  return axios.post(path, args).catch((e) => e.response);
};

export const getOrders = () => {
  return axios.get(path).catch((e) => e.response);
};

export const getOrderDetail = (id) => {
  console.log('orderId', id);
  return axios.get(`${path}/${id}`).catch((e) => e.response);
};
