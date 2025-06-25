import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://medback.site/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (data: any) => {
  return apiClient.post('/login', data);
};

export const logout = (token: string) => {
  return apiClient.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (data: any, token: string) => {
  return apiClient.post('/admin/create-user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default apiClient;
