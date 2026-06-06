import { env } from "cloudflare:workers";
import { getStripe } from "../lib/stripe.server";
import { getDb } from "../lib/db";
import { licenses } from "../lib/schema";
import { sendReceiptEmail } from "../lib/resend.server";

import type { Route } from "./+types/api.webhook";

export async function action({ request }: Route.ActionArgs) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const stripe = getStripe(env);

  let event;
  try {
    event = await  stripe.webhooks.constructEventAsync(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      customer_email?: string | null;
      customer?: string | null;
      metadata?: { email?: string; priceId?: string };
    };

    if (session.metadata?.priceId !== env.STRIPE_PRICE_ID) {
      return Response.json({ received: true, ignored: true });
    }

    const email = session.metadata?.email ?? session.customer_email;
    if (!email) {
      return Response.json({ received: true, ignored: true });
    }

    const lowerEmail = email.toLowerCase();

    const db = getDb(env);
    db
      .insert(licenses)
      .values({
        email: lowerEmail,
        stripeCustomerId: session.customer ?? null,
        stripeSessionId: session.id,
        purchasedAt: new Date(),
      })
      .onConflictDoNothing()
      .then(() => sendReceiptEmail(env, lowerEmail))
      .catch(() => {});
  }

  return Response.json({ received: true });
}

export function loader() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
