const configuredOrigin = process.env.GATEWAY_ORIGIN ?? "http://localhost:8787";
const gatewayUrl = new URL(configuredOrigin);

if (gatewayUrl.protocol !== "http:" && gatewayUrl.protocol !== "https:") {
  throw new Error("GATEWAY_ORIGIN must use http:// or https://");
}
if (gatewayUrl.pathname !== "/" || gatewayUrl.search || gatewayUrl.hash) {
  throw new Error("GATEWAY_ORIGIN must be an origin without a path, query, or fragment");
}

export const gatewayOrigin = gatewayUrl.origin;
export const gatewayWebSocketOrigin = gatewayOrigin.replace(/^http/, "ws");
