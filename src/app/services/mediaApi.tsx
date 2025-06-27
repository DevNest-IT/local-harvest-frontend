import axios from 'axios';

const mediaApiClient = axios.create({
  baseURL: 'https://mymediaserver.space/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', 'localharvest');
    return mediaApiClient.post('/upload', formData);
};
