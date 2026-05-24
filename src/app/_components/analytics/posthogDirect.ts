"use client";

import posthog from "posthog-js";
import type { Properties } from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ??
  "https://e.lebambougorillalodge.com";

const fallbackDistinctIdKey = "lbgl_analytics_distinct_id";

function getFallbackDistinctId() {
  let distinctId = window.localStorage.getItem(fallbackDistinctIdKey);
  if (!distinctId) {
    distinctId = crypto.randomUUID();
    window.localStorage.setItem(fallbackDistinctIdKey, distinctId);
  }

  return distinctId;
}

function getSessionId() {
  if (!posthogKey) return undefined;

  const persisted = window.localStorage.getItem(`ph_${posthogKey}_posthog`);
  if (!persisted) return undefined;

  try {
    const value = JSON.parse(persisted) as { $sesid?: unknown[] };
    return typeof value.$sesid?.[1] === "string" ? value.$sesid[1] : undefined;
  } catch {
    return undefined;
  }
}

function getDistinctId() {
  const posthogDistinctId = posthog.get_distinct_id?.();
  if (typeof posthogDistinctId === "string" && posthogDistinctId) {
    return posthogDistinctId;
  }

  return getFallbackDistinctId();
}

function getStringProperty(properties: Properties, key: string) {
  const value = properties[key] as unknown;
  return typeof value === "string" ? value : undefined;
}

export function captureDirectAnalyticsEvent(
  eventName: string,
  properties: Properties = {},
) {
  if (!posthogKey || typeof window === "undefined") return;

  const url = `${window.location.origin}${window.location.pathname}${window.location.search}`;
  const sessionId = getSessionId();
  const body = JSON.stringify({
    api_key: posthogKey,
    event: eventName,
    distinct_id: getDistinctId(),
    properties: {
      ...properties,
      $current_url: getStringProperty(properties, "$current_url") ?? url,
      $session_id: sessionId,
      path: getStringProperty(properties, "path") ?? window.location.pathname,
      source: getStringProperty(properties, "source") ?? "client_direct",
    },
  });

  const endpoint = `${posthogHost}/capture/`;
  if (typeof navigator.sendBeacon === "function" && body.length < 60_000) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(endpoint, blob)) return;
  }

  void fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
    keepalive: body.length < 60_000,
  }).catch((error: unknown) => {
    console.warn("PostHog direct analytics capture failed", {
      event: eventName,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  });
}
