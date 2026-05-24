"use client";

import posthog from "posthog-js";
import type { Properties } from "posthog-js";

const posthogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

export function captureAnalyticsEvent(
  eventName: string,
  properties?: Properties,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  posthog.capture(eventName, properties);
}

export function captureAnalyticsException(
  error: unknown,
  properties?: Properties,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  posthog.captureException(error, properties);
}
