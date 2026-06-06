import { env } from "cloudflare:workers";
import { getStripe } from "../lib/stripe.server";

import type { Route } from "./+types/api.checkout";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const stripe = getStripe(env);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
      customer_email: email,
      success_url: `${env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.APP_URL}/`,
      metadata: { email: email.toLowerCase(), priceId: env.STRIPE_PRICE_ID },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return Response.json({ error: message }, { status: 400 });
  }
}

export function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
