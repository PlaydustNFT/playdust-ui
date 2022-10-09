import axios, { AxiosInstance } from 'axios';
import AllOrdersType from '../_types/AllOrdersType';

const instance: AxiosInstance = axios.create({
  baseURL: `/playdust-api`,
});

const getOrdersForMint = async (mint: string): Promise<AllOrdersType> => {
  const { data } = await instance.get<AllOrdersType>(`/trading/${mint}/orders`);
  return data;
};

export default getOrdersForMint;
