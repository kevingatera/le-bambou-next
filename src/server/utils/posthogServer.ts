import { env } from "~/env";

type ServerAnalyticsProperties = Record<string, unknown>;

const posthogProjectToken = env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
  env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://e.lebambougorillalodge.com";

export async function captureServerAnalyticsEvent(
  event: string,
  distinctId: string,
  properties: ServerAnalyticsProperties = {},
) {
  if (!posthogProjectToken) return;

  try {
    const response = await fetch(`${posthogHost}/capture/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        api_key: posthogProjectToken,
        event,
        distinct_id: distinctId,
        properties: {
          ...properties,
          source: "server",
        },
      }),
    });

    if (!response.ok) {
      console.warn("PostHog server analytics capture failed", {
        event,
        status: response.status,
      });
    }
  } catch (error) {
    console.warn("PostHog server analytics capture failed", {
      event,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
