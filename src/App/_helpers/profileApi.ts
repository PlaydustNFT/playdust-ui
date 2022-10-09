import axios, { AxiosInstance } from 'axios';

const profileApi: AxiosInstance = axios.create({
  baseURL: '/playdust-api/user-profile',
});

export default profileApi;
