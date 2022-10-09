import axios, { AxiosInstance } from 'axios';

const frontendApi: AxiosInstance = axios.create({
  baseURL: '/api',
});

export default frontendApi;
