import { Infer, optional, string, type } from 'superstruct';

type HubspotSuccessResponseType = Infer<typeof HubspotSuccessResponseType>;
const HubspotSuccessResponseType = type({
  redirectUri: optional(string()),
  inlineMessage: optional(string()),
});

export default HubspotSuccessResponseType;
