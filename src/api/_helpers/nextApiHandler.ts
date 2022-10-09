import type { NextApiRequest, NextApiResponse } from 'next';

type GetResponseType<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<T>;

function nextApiHandler<T>(getResponse: GetResponseType<T>) {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    try {
      const response = await getResponse(req, res);
      res.json(response);
    } catch (e) {
      console.error('Error:', e);
      res.status(500).end(e);
    }
  };
}

export default nextApiHandler;
