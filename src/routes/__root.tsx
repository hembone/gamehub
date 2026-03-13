import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider, useTheme } from '../hooks/useTheme'

import appCss from '../styles.css?url'

function AppShell() {
  const { isEdu } = useTheme()
  return (
    <div className={`
      min-h-screen transition-colors duration-400 overflow-x-hidden
      ${isEdu ? 'bg-edu-bg text-edu-text' : 'bg-synth-bg text-synth-text'}
    `}>
      <Outlet />
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
      { title: 'Arcade Void — Unblocked Games' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap',
      },
    ],
  }),
  component: AppShell,
  shellComponent: RootDocument,
})
