import axios from "axios";

import { getToken, onSignIn } from '../services/auth';
import { setRegistered } from '../mobX/userStore';

const SERVER_BASE = "http://localhost:4000";

const getHeaders = async() => {
  const token = await getToken();

  return ({
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
  });
};

const api = {
  async signUp(data) {
    return axios({
      method: "post",
      url: `${SERVER_BASE}/sign-up`,
      data,
    });
  },

  async signIn(data) {
    return axios({
      method: "post",
      url: `${SERVER_BASE}/sign-in`,
      data
    })
    .then(({ token }) => {
      setRegistered(true);
      onSignIn(token);
    });
  },

  async uploadFile(file) {
    const data = new FormData();

    data.append('photo', file, file.name);

    return axios({
      method: "post",
      url: `${SERVER_BASE}/upload`,
      headers: await getHeaders(),
      data
    });
  },

  async getUserProfile() {
    return axios({
      method: "get",
      url: `${SERVER_BASE}/user`,
      headers: await getHeaders(),
    })
  },
};

export default api;