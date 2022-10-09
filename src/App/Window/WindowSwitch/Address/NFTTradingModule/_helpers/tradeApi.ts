import axios, { AxiosInstance } from 'axios';

const TREASURY_MINT = 'So11111111111111111111111111111111111111112';

const tradeApi: AxiosInstance = axios.create({
  baseURL: `/playdust-api/auction-house/${TREASURY_MINT}`,
});

export default tradeApi;
