import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Infer, union } from 'superstruct';
import HubspotErrorResponseType from '../App/Window/JoinTheWhitelist/_types/HubspotErrorResponseType';
import HubspotSuccessResponseType from '../App/Window/JoinTheWhitelist/_types/HubspotSuccessResponseType';

type HubspotResponseType = Infer<typeof HubspotResponseType>;
const HubspotResponseType = union([
  HubspotSuccessResponseType,
  HubspotErrorResponseType,
]);
interface JoinWaitlistNextApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const joinWaitlist = async (
  req: JoinWaitlistNextApiRequest,
  res: NextApiResponse<HubspotResponseType>
) => {
  const { email } = req.body;

  const hapikey = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_JOIN_WHITELIST_FORM_ID;

  if (!hapikey) {
    throw new Error('Required env variable HUBSPOT_ACCESS_TOKEN not found.');
  }

  if (!portalId) {
    throw new Error('Required env variable HUBSPOT_PORTAL_ID not found.');
  }

  if (!formId) {
    throw new Error(
      'Required env variable HUBSPOT_JOIN_WHITELIST_FORM_ID not found.'
    );
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const data = {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email,
      },
    ],
  };

  try {
    const resp = await axios.post<HubspotSuccessResponseType>(url, data, {
      params: {
        hapikey,
      },
    });

    return res.status(200).json(resp.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<HubspotErrorResponseType>;

      if (serverError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return res
          .status(serverError.response.status)
          .json(serverError.response.data);
      }
    }

    return res.status(500);
  }
};

export default joinWaitlist;
