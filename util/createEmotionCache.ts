// Create a cache for the Server Side Rendered content for NEXTJS
// This is as per MUI v5 documentation:
// https://mui.com/guides/server-rendering/#heading-handling-the-request
// and as per official sample repo:
// https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript

import createCache from '@emotion/cache'

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}

export default createEmotionCache
