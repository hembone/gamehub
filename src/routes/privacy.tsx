import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";
import { SITE_URL, SITE_NAME } from "../config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${SITE_NAME}` },
      { name: "description", content: `Privacy Policy for ${SITE_NAME}. Learn how we use cookies, analytics, and advertising.` },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { isEdu } = useTheme();

  const heading = `mt-8 mb-3 font-black text-xl ${isEdu ? "text-edu-accent font-edu-display" : "font-display tracking-wide text-synth-text"}`;
  const subheading = `mt-6 mb-2 font-bold text-base ${isEdu ? "text-edu-text font-edu-body" : "font-display tracking-wide text-synth-text"}`;
  const prose = `text-sm leading-relaxed ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`;
  const link = `underline ${isEdu ? "text-edu-accent" : "text-synth-accent"}`;

  return (
    <>
      <Header search="" onSearchChange={() => {}} />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-16 pt-8">
        <Link
          to="/"
          className={`text-xs opacity-60 hover:opacity-100 transition-opacity no-underline ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}
        >
          &larr; Back to Games
        </Link>

        <h1 className={`mt-4 mb-2 font-black text-3xl ${isEdu ? "text-edu-accent font-edu-display" : "font-display tracking-wide text-synth-text"}`}>
          {isEdu ? "Privacy Policy" : "PRIVACY POLICY"}
        </h1>
        <p className={`text-xs mb-8 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}>
          Last updated: April 3, 2026
        </p>

        <div className={prose}>
          <p>
            This Privacy Policy describes how {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
            uses, and shares information when you visit{" "}
            <a href={SITE_URL} className={link}>{SITE_URL}</a> (the &ldquo;Site&rdquo;).
            By using the Site, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className={heading}>Information We Collect</h2>
          <p>
            We do not require account registration. We may automatically collect the following information when you visit the Site:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Device and browser information (type, version, operating system)</li>
            <li>IP address and approximate geographic location</li>
            <li>Pages visited, time spent, and interaction data</li>
            <li>Referring website or search terms</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className={heading}>Google AdSense</h2>
          <p>
            We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on
            your prior visits to this Site and other websites. Google&rsquo;s use of advertising cookies enables it
            and its partners to serve ads based on your browsing history.
          </p>
          <h3 className={subheading}>Personalized vs. Non-Personalized Ads</h3>
          <p>
            If you accept all cookies via our consent banner, Google may serve personalized ads based on your
            interests and browsing behavior. If you choose &ldquo;Essential Only,&rdquo; we instruct Google to serve
            non-personalized ads that do not use interest-based targeting.
          </p>
          <p className="mt-2">
            You can opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" className={link} target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>. For more information, see the{" "}
            <a href="https://policies.google.com/privacy" className={link} target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>.
          </p>

          <h2 className={heading}>Google Analytics</h2>
          <p>
            We use Google Analytics (GA4) and Google Tag Manager to understand how visitors interact with our Site.
            These services collect data such as pages viewed, session duration, and general location.
            Google Analytics uses cookies and is only loaded when you accept all cookies via our consent banner.
          </p>
          <p className="mt-2">
            You can opt out of Google Analytics by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className={link} target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2 className={heading}>PostHog Analytics</h2>
          <p>
            We use PostHog for product analytics to understand how visitors use the Site. PostHog collects page views,
            session data, and interaction events. PostHog is only initialized when you accept all cookies via our
            consent banner.
          </p>

          <h2 className={heading}>Cookies &amp; Consent</h2>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Essential cookies:</strong> Required for basic site functionality, such as remembering your cookie consent preference and theme choice. These are always active.</li>
            <li><strong>Analytics cookies:</strong> Used by Google Analytics and PostHog to understand site usage. Only set when you accept all cookies.</li>
            <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant ads. Personalized ad cookies are only used when you accept all cookies; otherwise, non-personalized ads are served.</li>
          </ul>
          <p className="mt-2">
            You can change your cookie preferences at any time by clearing your browser&rsquo;s local storage for this site
            and reloading the page, which will display the consent banner again.
          </p>

          <h2 className={heading}>Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google AdSense (advertising)</li>
            <li>Google Analytics / Google Tag Manager (analytics)</li>
            <li>PostHog (product analytics)</li>
          </ul>
          <p className="mt-2">
            Each service has its own privacy policy governing the data it collects. We encourage you to review their policies.
          </p>

          <h2 className={heading}>Children&rsquo;s Privacy</h2>
          <p>
            Our Site is not directed at children under the age of 13. We do not knowingly collect personal information
            from children under 13. If we become aware that we have collected personal data from a child under 13, we
            will take steps to remove that information. The Site&rsquo;s educational mode is designed to provide a
            family-friendly experience but does not specifically target children under 13.
          </p>

          <h2 className={heading}>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            &ldquo;Last updated&rdquo; date. Your continued use of the Site after changes constitutes acceptance of
            the updated policy.
          </p>

          <h2 className={heading}>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can contact us at{" "}
            <a href="mailto:support@arcadevoid.games" className={link}>support@arcadevoid.games</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
