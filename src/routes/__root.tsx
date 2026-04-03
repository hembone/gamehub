import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { ThemeProvider, useTheme } from '../hooks/useTheme'
import { ConsentProvider, useCookieConsent } from '../hooks/useCookieConsent'
import { PostHogProvider } from '../hooks/usePostHog'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../config'
import { JsonLd } from '../components/JsonLd'
import { CookieConsent } from '../components/CookieConsent'
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

let analyticsInjected = false;

function injectAnalytics() {
  if (analyticsInjected) return;
  analyticsInjected = true;

  // GTM
  const gtmScript = document.createElement('script');
  gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PHCHFR4Q');`;
  document.head.appendChild(gtmScript);

  // GA4
  const ga4Script = document.createElement('script');
  ga4Script.async = true;
  ga4Script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXW6S1346T';
  document.head.appendChild(ga4Script);

  const ga4Config = document.createElement('script');
  ga4Config.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HXW6S1346T');`;
  document.head.appendChild(ga4Config);
}

function AppShell() {
  const { isEdu } = useTheme()
  const { consent } = useCookieConsent()

  useEffect(() => { reportWebVitals(); }, []);

  useEffect(() => {
    if (consent === null) return;

    if (consent === 'all') {
      injectAnalytics();
    } else {
      // Non-personalized ads when user explicitly rejected
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.requestNonPersonalizedAds = 1;
    }
  }, [consent]);

  return (
    <div className={`
      min-h-screen transition-colors duration-400
      ${isEdu ? 'bg-edu-bg text-edu-text' : 'bg-synth-bg text-synth-text'}
    `}>
      <JsonLd data={SITE_SCHEMA} />
      <Outlet />
      <CookieConsent />
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConsentProvider>
          <PostHogProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </PostHogProvider>
        </ConsentProvider>
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
      { name: 'theme-color', content: '#0d0015' },
      // Open Graph image
      { property: 'og:image', content: `${SITE_URL}/og-image.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // Preconnect for Google Fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap',
      },
    ],
    scripts: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3744119325664696',
        async: true,
        crossOrigin: 'anonymous',
      },
    ],
  }),
  component: AppShell,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  const { isEdu } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className={`text-6xl font-black mb-4 ${isEdu ? "text-edu-accent font-edu-display" : "font-display tracking-wide text-synth-text"}`}>
        {isEdu ? "404" : "404"}
      </h1>
      <p className={`text-sm mb-6 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}>
        {isEdu ? "Oops! This page doesn't exist." : "PAGE NOT FOUND."}
      </p>
      <Link
        to="/"
        className={`
          px-6 py-2 rounded-full text-sm font-bold border transition-all duration-200 no-underline
          ${isEdu
            ? "font-edu-body bg-edu-accent text-white border-edu-accent hover:shadow-[0_4px_12px_rgba(49,130,206,0.3)]"
            : "font-display tracking-widest uppercase bg-synth-accent text-white border-synth-accent hover:shadow-[0_0_14px_#ff2dff]"
          }
        `}
      >
        {isEdu ? "Back to Games" : "BACK TO GAMES"}
      </Link>
    </div>
  );
}
