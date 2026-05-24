"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import type { PostHogConfig, Properties } from "posthog-js";
import {
  PostHogProvider as Provider,
  usePostHog,
} from "posthog-js/react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ??
  "https://e.lebambougorillalodge.com";
const posthogUiHost =
  process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com";

const sensitivePropertyPattern =
  /(email|phone|name|message|address|token|password|secret|card|payment)/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const phonePattern = /(?:\+?\d[\d\s().-]{7,}\d)/g;

function sanitizeAnalyticsValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(emailPattern, "[redacted-email]").replace(
      phonePattern,
      "[redacted-phone]",
    );
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeAnalyticsValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        sensitivePropertyPattern.test(key)
          ? "[redacted]"
          : sanitizeAnalyticsValue(entry),
      ]),
    );
  }

  return value;
}

const posthogOptions: Partial<PostHogConfig> = {
  api_host: posthogHost,
  ui_host: posthogUiHost,
  defaults: "2026-01-30",
  person_profiles: "identified_only",
  capture_pageview: false,
  capture_pageleave: true,
  request_queue_config: {
    flush_interval_ms: 1000,
  },
  autocapture: {
    dom_event_allowlist: ["click", "submit"],
    element_allowlist: ["a", "button", "form", "input", "select", "textarea"],
    element_attribute_ignorelist: [
      "value",
      "placeholder",
      "title",
      "data-value",
      "data-email",
      "data-phone",
    ],
  },
  capture_dead_clicks: {
    css_selector_ignorelist: [
      ".ph-no-capture",
      ".ph-no-deadclick",
      "a[href^='https://wa.me']",
    ],
  },
  capture_exceptions: {
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
    capture_console_errors: false,
  },
  capture_performance: {
    network_timing: true,
    web_vitals: true,
    web_vitals_attribution: true,
  },
  enable_recording_console_log: false,
  disable_session_recording: false,
  session_recording: {
    maskAllInputs: true,
    maskTextSelector:
      "input, textarea, select, [data-ph-mask], .ph-mask, .ph-no-capture",
    blockSelector: "[data-ph-block], .ph-block",
    recordHeaders: false,
    recordBody: false,
    maskCapturedNetworkRequestFn: (request) => {
      if (request.name.includes("/api/trpc")) {
        return {
          ...request,
          requestBody: undefined,
          responseBody: undefined,
        };
      }

      return request;
    },
  },
  before_send: (event) => {
    if (!event) return event;

    event.properties = sanitizeAnalyticsValue(event.properties) as Properties;
    if (event.$set) {
      event.$set = sanitizeAnalyticsValue(event.$set) as Properties;
    }
    if (event.$set_once) {
      event.$set_once = sanitizeAnalyticsValue(event.$set_once) as Properties;
    }

    return event;
  },
};

if (typeof window !== "undefined" && posthogKey && !posthog.__loaded) {
  posthog.init(posthogKey, posthogOptions);
}

export function PostHogAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!posthogKey) return <>{children}</>;

  return (
    <Provider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </Provider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    const queryString = searchParams.toString();
    const url = `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ""}`;

    posthog.capture("$pageview", {
      $current_url: url,
      path: pathname,
    });
  }, [pathname, posthog, searchParams]);

  return null;
}
