import axios from 'axios';

export function getUserBackend(userEmail) {
  return axios.get(`/api/user/${userEmail}`)
};

export function addUserBackend(newUser) {
  return axios.post(`/api/user/:user_info`, {
    user_info: newUser
  })
};

export function updateUserBackend(user) {
  return axios.put(`/api/user/:user_id`, {
    user_info: user
  })
};