import { Client } from '@opensearch-project/opensearch';

const client = new Client({
  node: process.env.OPENSEARCH_URL,
  auth: {
    username: process.env.OPENSEARCH_USER || '',
    password: process.env.OPENSEARCH_PASSWORD || '',
  },
});

export default client;
