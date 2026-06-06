import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("success", "routes/success.tsx"),
  route("api/checkout", "routes/api.checkout.ts"),
  route("api/verify", "routes/api.verify.ts"),
  route("api/webhook", "routes/api.webhook.ts"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
] satisfies RouteConfig;
