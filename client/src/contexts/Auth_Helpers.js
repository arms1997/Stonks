import axios from 'axios';

export function getUserBackend(userEmail) {

  return axios.get(`/api/user/${userEmail}`)

};

