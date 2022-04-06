import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../styles/theme'
import createEmotionCache from '../util/createEmotionCache'
import Layout from '../components/Layout'
import { AuthCtxProvider } from '../context/AuthCtx'
import { AlertCtxProvider } from '../context/AlertCtx'
import { TasksCtxProvider } from '../context/TasksCtx'
import { TeamsCtxProvider } from '../context/TeamsCtx'
import { FilterCtxProvider } from '../context/FilterCtx'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthCtxProvider>
          <FilterCtxProvider>
            <TasksCtxProvider>
              <TeamsCtxProvider>
                <AlertCtxProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </AlertCtxProvider>
              </TeamsCtxProvider>
            </TasksCtxProvider>
          </FilterCtxProvider>
        </AuthCtxProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
