import axios from "axios";

export function getUserBackend(userEmail) {
  return axios.get(`/api/user/${userEmail}`);
}

export function addUserBackend(newUser) {
  return axios.post(`/api/user/:user_info`, {
    user_info: newUser,
  });
}

export function updateUserBackend(user_id, userChanges) {
  return axios.put(`/api/user/:user_id`, {
    user_id: user_id,
    user_info: userChanges,
  });
}

export function likeTicker(user_id, ticker, company) {
  return axios.post(`/api/like`, {
    userId: user_id,
    ticker: ticker,
    company: company,
  });
}

export function updateLikeTicker(like_id) {
  return axios.put(`/api/like/${like_id}`);
}

export function createWatchTicker(user_id, ticker, value) {
  return axios.post(`/api/watch`, {
    userId: user_id,
    ticker: ticker,
    value: value,
  });
}

export function removeWatchTicker(watchId) {
  return axios.put(`/api/watch/${watchId}`);
}

export function updateWatchTicker(watchId, value) {
  return axios.put(`api/watch/${watchId}`, {
    value: value,
  });
}
