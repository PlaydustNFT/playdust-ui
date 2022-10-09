import axios, { AxiosInstance } from 'axios';

const authenticationApi: AxiosInstance = axios.create({
  baseURL: '/playdust-api/authentication',
});

export default authenticationApi;
