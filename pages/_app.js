import React from "react";
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';

import theme from '../src/utils/theme';
import createEmotionCache from '../src/utils/createEmotionCache';
import GlobalContextProvider from "../src/contexts/globalContext";
import AuthContextProvider from "../src/contexts/authContext";

import '../styles/globals.css';
import 'react-circular-progressbar/dist/styles.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, ...pageProps } = props;

  return <>
    <GlobalContextProvider>
      <CacheProvider value={emotionCache}>
        <AuthContextProvider>

          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContextProvider>
      </CacheProvider>
    </GlobalContextProvider>
  </>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
