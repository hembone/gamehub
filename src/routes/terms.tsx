import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";
import { SITE_URL, SITE_NAME } from "../config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Service — ${SITE_NAME}` },
      { name: "description", content: `Terms of Service for ${SITE_NAME}. Rules and conditions for using our free online games platform.` },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { isEdu } = useTheme();

  const heading = `mt-8 mb-3 font-black text-xl ${isEdu ? "text-edu-accent font-edu-display" : "font-display tracking-wide text-synth-text"}`;
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
          {isEdu ? "Terms of Service" : "TERMS OF SERVICE"}
        </h1>
        <p className={`text-xs mb-8 ${isEdu ? "text-edu-text2 font-edu-body" : "text-synth-text2 font-body"}`}>
          Last updated: April 3, 2026
        </p>

        <div className={prose}>
          <h2 className={heading}>Acceptance of Terms</h2>
          <p>
            By accessing or using {SITE_NAME} (<a href={SITE_URL} className={link}>{SITE_URL}</a>), you agree to be
            bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
          </p>

          <h2 className={heading}>Description of Service</h2>
          <p>
            {SITE_NAME} is a free online gaming platform that aggregates and provides access to browser-based games.
            Games are embedded from third-party sources and played directly in your web browser. No download or
            installation is required. The service is provided free of charge and is supported by advertising.
          </p>

          <h2 className={heading}>User Conduct</h2>
          <p>When using the Site, you agree not to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Attempt to bypass, disable, or interfere with advertisements displayed on the Site</li>
            <li>Use automated tools, bots, or scrapers to access the Site or its content</li>
            <li>Attempt to gain unauthorized access to the Site&rsquo;s systems or infrastructure</li>
            <li>Artificially inflate ad impressions or clicks</li>
            <li>Use the Site for any unlawful purpose</li>
            <li>Distribute, modify, or create derivative works based on the Site&rsquo;s content without permission</li>
          </ul>

          <h2 className={heading}>Intellectual Property</h2>
          <p>
            The games available on the Site are owned by their respective developers and publishers. {SITE_NAME} does
            not claim ownership of any third-party game content. The Site&rsquo;s design, branding, and original content
            are the property of {SITE_NAME} and are protected by applicable intellectual property laws.
          </p>

          <h2 className={heading}>Advertising</h2>
          <p>
            The Site is supported by advertising, including Google AdSense. By using the Site, you acknowledge that
            advertisements will be displayed during your visit. You agree not to use ad-blocking software that
            interferes with the Site&rsquo;s advertising or to take any action that artificially manipulates ad
            impressions or clicks.
          </p>

          <h2 className={heading}>Third-Party Content &amp; Links</h2>
          <p>
            The Site embeds games and may contain links to third-party websites. We are not responsible for the
            content, accuracy, or practices of any third-party sites or games. Your use of third-party content is
            at your own risk and subject to those parties&rsquo; respective terms and policies.
          </p>

          <h2 className={heading}>Disclaimers</h2>
          <p>
            The Site and all content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted,
            error-free, or free of harmful components. We make no warranties regarding the accuracy, reliability,
            or completeness of any game or content on the Site.
          </p>

          <h2 className={heading}>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} and its operators shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising from your use of or inability
            to use the Site, including but not limited to loss of data, revenue, or profits.
          </p>

          <h2 className={heading}>Termination</h2>
          <p>
            We reserve the right to restrict or terminate access to the Site at our sole discretion, without notice,
            for any reason, including violation of these Terms of Service.
          </p>

          <h2 className={heading}>Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Changes will be posted on this page with an
            updated &ldquo;Last updated&rdquo; date. Your continued use of the Site after changes constitutes
            acceptance of the updated terms.
          </p>

          <h2 className={heading}>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the United
            States. Any disputes arising from these terms or your use of the Site shall be resolved in the
            applicable courts of the United States.
          </p>

          <h2 className={heading}>Contact</h2>
          <p>
            If you have questions about these Terms of Service, you can contact us at{" "}
            <a href="mailto:contact@arcadevoid.games" className={link}>contact@arcadevoid.games</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
