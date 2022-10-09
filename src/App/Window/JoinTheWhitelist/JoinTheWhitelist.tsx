import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import React, { KeyboardEvent, useRef, useState } from 'react';
import safePromise from '../../_helpers/safePromise';
import frontendApi from '../_helpers/frontendApi';
import Link from '../_sharedComponents/Link';
import PlaydustLogo from '../_sharedComponents/PlaydustLogo';
import HubspotErrorResponseType from './_types/HubspotErrorResponseType';
import HubspotSuccessResponseType from './_types/HubspotSuccessResponseType';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function InlineForm() {
  const [processing, setProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<{ color: string; text: string }>();

  const inputRef = useRef<HTMLInputElement>();

  const submitForm = async () => {
    if (!inputRef.current) {
      return;
    }

    const email = inputRef.current.value;

    if (!emailRegex.test(email)) {
      setMessage({ color: 'error', text: 'Please enter a valid email.' });
      return;
    }

    setProcessing(true);
    setMessage({ color: 'default', text: 'Submitting...' });

    try {
      const res = await frontendApi.post<HubspotSuccessResponseType>(
        '/join-waitlist',
        {
          email,
        }
      );

      setMessage({
        color: 'success',
        text: 'You have successfully joined our whitelist.',
      });

      const { redirectUri } = res.data;
      if (typeof redirectUri === 'string') {
        window.location.href = redirectUri;
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<HubspotErrorResponseType>;

        if (serverError.response) {
          if (
            serverError.response.status === 400 &&
            serverError.response.data.errors &&
            serverError.response.data.errors[0].errorType === 'INVALID_EMAIL'
          ) {
            setMessage({ color: 'error', text: 'Please enter a valid email.' });
            return;
          }
        }
      }

      setMessage({ color: 'error', text: 'An unknown error occurred.' });
    } finally {
      setProcessing(false);
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      await submitForm();
    }
  };

  const handleClickButton = async () => {
    await submitForm();
  };

  return (
    <Box sx={{ mt: 6, mb: 2 }}>
      <Grid
        container={true}
        spacing={2}
        alignItems="stretch"
        justifyContent="center"
      >
        <Grid item={true}>
          <TextField
            inputRef={inputRef}
            placeholder="Enter your email..."
            variant="outlined"
            size="small"
            inputProps={{ size: 32 }}
            onKeyPress={(...args) => safePromise(handleKeyPress(...args))}
            disabled={processing}
          />
        </Grid>
        <Grid item={true}>
          <Button
            variant="contained"
            sx={{ height: '100%', fontSize: '16px', fontWeight: 500 }}
            onClick={() => safePromise(handleClickButton())}
            disabled={processing}
          >
            Get Beta Access
          </Button>
        </Grid>
      </Grid>
      {message && (
        <Typography
          color={message?.color || 'default'}
          sx={{ visibility: message ? 'visible' : 'hidden', padding: '4px' }}
        >
          {message?.text || '-'}
        </Typography>
      )}
    </Box>
  );
}

function JoinTheWhitelist() {
  return (
    <Box
      sx={{
        p: 2,
        pt: 10,
        textAlign: 'center',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <PlaydustLogo width="215px" />
        </Box>
        <Typography variant="body1" marginBottom="16px">
          A Solana Search Engine
        </Typography>
        <InlineForm />
        <Typography
          variant="subtitle2"
          gutterBottom={true}
          sx={{ mb: 6, color: 'grey.500' }}
        >
          By providing your email address, you are agreeing to our{' '}
          <Link
            href="https://info.playdust.com/terms-of-service?hsLang=en"
            target="_blank"
            rel="noreferrer"
            underline="always"
            color="inherit"
          >
            terms of use
          </Link>{' '}
          and{' '}
          <Link
            href="https://info.playdust.com/privacy-policy?hsLang=en"
            target="_blank"
            rel="noreferrer"
            underline="always"
            color="inherit"
          >
            privacy policy
          </Link>
          .
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600 }}>
          Playdust is a Solana blockchain search engine working to empower
          collectors and creators to explore, understand and interact with the
          data on the blockchain.
        </Typography>
      </Box>
    </Box>
  );
}

export default JoinTheWhitelist;
