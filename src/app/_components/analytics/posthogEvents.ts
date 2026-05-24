"use client";

import posthog from "posthog-js";
import type { CaptureOptions, Properties } from "posthog-js";

const posthogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

export function captureAnalyticsEvent(
  eventName: string,
  properties?: Properties,
  options?: CaptureOptions,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  posthog.capture(eventName, properties, {
    send_instantly: true,
    transport: "fetch",
    ...options,
  });
}

export function captureAnalyticsException(
  error: unknown,
  properties?: Properties,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  posthog.captureException(error, properties);
}
