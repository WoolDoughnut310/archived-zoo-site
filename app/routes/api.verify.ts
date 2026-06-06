import { env } from "cloudflare:workers";
import { isLicensed } from "../lib/verify.server";

import type { Route } from "./+types/api.verify";

export async function action({ request }: Route.ActionArgs) {
  const { email } = (await request.json()) as { email: string };
  const licensed = await isLicensed(email, env);
  return Response.json({ licensed });
}

export function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
