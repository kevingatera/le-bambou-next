"use client";

import posthog from "posthog-js";
import type { CaptureOptions, Properties } from "posthog-js";
import { captureDirectAnalyticsEvent } from "./posthogDirect";

const posthogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

export function captureAnalyticsEvent(
  eventName: string,
  properties?: Properties,
  options?: CaptureOptions,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  if (options) {
    posthog.capture(eventName, properties, options);
    return;
  }

  captureDirectAnalyticsEvent(eventName, properties);
}

export function captureAnalyticsException(
  error: unknown,
  properties?: Properties,
) {
  if (!posthogEnabled || typeof window === "undefined") return;
  posthog.captureException(error, properties);
  captureDirectAnalyticsEvent("client_exception_reported", {
    ...properties,
    error_name: error instanceof Error ? error.name : "UnknownError",
    error_message: error instanceof Error ? error.message : "Unknown error",
  });
}
