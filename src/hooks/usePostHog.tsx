import { createContext, useContext, useEffect, useState } from "react";
import posthog from "posthog-js";
import type { PostHog } from "posthog-js";

const PostHogContext = createContext<PostHog | null>(null);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

    if (!token) return;

    posthog.init(token, {
      api_host: host || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
    });

    setClient(posthog);
  }, []);

  return (
    <PostHogContext.Provider value={client}>
      {children}
    </PostHogContext.Provider>
  );
}

export function usePostHog() {
  return useContext(PostHogContext);
}
