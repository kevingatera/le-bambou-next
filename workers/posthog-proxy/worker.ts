const POSTHOG_API_HOST = "https://us.i.posthog.com";
const POSTHOG_ASSET_HOST = "https://us-assets.i.posthog.com";

const ASSET_PATH_PREFIXES = ["/array/", "/static/"];
const CACHEABLE_ASSET_PREFIXES = ["/static/"];

function getUpstreamHost(pathname: string) {
  return ASSET_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
    ? POSTHOG_ASSET_HOST
    : POSTHOG_API_HOST;
}

function isCacheableAsset(pathname: string) {
  return CACHEABLE_ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function applyCorsHeaders(headers: Headers, request: Request) {
  const origin = request.headers.get("origin") ?? "*";

  headers.set("access-control-allow-origin", origin);
  headers.set("access-control-allow-methods", "GET, POST, OPTIONS");
  headers.set(
    "access-control-allow-headers",
    request.headers.get("access-control-request-headers") ??
      "content-type, x-requested-with",
  );
  headers.set("access-control-max-age", "86400");
  headers.set("vary", "Origin");

  if (origin !== "*") {
    headers.set("access-control-allow-credentials", "true");
  }
}

const worker = {
  async fetch(request: Request): Promise<Response> {
    const incomingUrl = new URL(request.url);
    if (request.method === "OPTIONS") {
      const headers = new Headers();
      applyCorsHeaders(headers, request);
      return new Response(null, { headers, status: 204 });
    }

    const upstreamUrl = new URL(incomingUrl.pathname + incomingUrl.search, getUpstreamHost(incomingUrl.pathname));
    const headers = new Headers(request.headers);

    headers.delete("cookie");
    headers.delete("host");

    const upstreamRequest = new Request(upstreamUrl, {
      body: request.body,
      headers,
      method: request.method,
      redirect: request.redirect,
    });

    const response = await fetch(upstreamRequest);
    const responseHeaders = new Headers(response.headers);

    applyCorsHeaders(responseHeaders, request);

    if (isCacheableAsset(incomingUrl.pathname)) {
      responseHeaders.set(
        "cache-control",
        "public, max-age=86400, stale-while-revalidate=604800",
      );
    } else {
      responseHeaders.set("cache-control", "no-store");
    }

    return new Response(response.body, {
      headers: responseHeaders,
      status: response.status,
      statusText: response.statusText,
    });
  },
};

export default worker;
