import { array, Infer, literal, object, string, type } from 'superstruct';

type HubspotErrorResponseType = Infer<typeof HubspotErrorResponseType>;
const HubspotErrorResponseType = type({
  status: literal('error'),
  message: string(),
  correlationId: string(),
  errors: array(
    object({
      message: string(),
      errorType: string(),
    })
  ),
});

export default HubspotErrorResponseType;
