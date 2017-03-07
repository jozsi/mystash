import axios from 'axios';

export function login(email, password) {
  return axios.post('/user/login', {
    email,
    password,
  });
}

export function get() {
  return axios.get('/user');
}
