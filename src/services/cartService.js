import axios from './httpRequester';

const path = '/cart'
export const addItem = (itemId) => {
  return axios.post(path, { itemId }).catch((e) => e.response);
};

// export const addItem = async (itemId) => {
//   return await axios.post('/cart', { itemId });
// };

export const getItems = () => {
  return axios.get(path).catch((e) => e.response);
};

export const removeItem = (cart_id) => {
  return axios.delete(`/${path}/${cart_id}`).catch((e) => e.response);
  // 두번째 인자가 쿼리스트링으로 바뀌려면 params라는 속성 안에 값이 있는 객체를 넣어줘야함
};

export const clearItem = () => {
  return axios.delete(path).catch(e => e.response)
}
