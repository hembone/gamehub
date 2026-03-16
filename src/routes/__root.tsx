import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider, useTheme } from '../hooks/useTheme'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../config'
import { JsonLd } from '../components/JsonLd'
import { reportWebVitals } from '../utils/vitals'

import appCss from '../styles.css?url'

const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "description": SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function AppShell() {
  const { isEdu } = useTheme()

  useEffect(() => { reportWebVitals(); }, []);

  return (
    <div className={`
      min-h-screen transition-colors duration-400
      ${isEdu ? 'bg-edu-bg text-edu-text' : 'bg-synth-bg text-synth-text'}
    `}>
      <JsonLd data={SITE_SCHEMA} />
      <Outlet />
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PHCHFR4Q');` }} />
        <HeadContent />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHCHFR4Q" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${SITE_NAME} — Free Online Games` },
      { name: 'description', content: SITE_DESCRIPTION },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: `${SITE_NAME} — Free Online Games` },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${SITE_NAME} — Free Online Games` },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
      // Robots
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'canonical', href: SITE_URL },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap',
      },
    ],
  }),
  component: AppShell,
  shellComponent: RootDocument,
})
