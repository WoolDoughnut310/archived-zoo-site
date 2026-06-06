import { env } from "cloudflare:workers";
import { getStripe } from "../lib/stripe.server";
import { getDb } from "../lib/db";
import { licenses } from "../lib/schema";
import { useFetcher } from "react-router";
import { useEffect, useState } from "react";

import type { Route } from "./+types/success";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return { status: "failed" as const };
  }

  try {
    const stripe = getStripe(env);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      return { status: "pending" as const, sessionId };
    }

    const email = session.metadata?.email ?? session.customer_email ?? null;

    if (email) {
      const db = getDb(env);
      await db
        .insert(licenses)
        .values({
          email: email.toLowerCase(),
          stripeCustomerId: (session.customer as string) ?? null,
          stripeSessionId: session.id,
          purchasedAt: new Date(),
        })
        .onConflictDoNothing();
    }

    return { status: "verified" as const, email };
  } catch {
    return { status: "failed" as const };
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Payment Confirmed — Desktop Zoo" }];
}

export default function Success({ loaderData }: Route.ComponentProps) {
  const revalidate = useFetcher<typeof loaderData>();
  const [retries, setRetries] = useState(0);

  const data = revalidate.data ?? loaderData;

  useEffect(() => {
    if (data.status === "pending" && retries < 5) {
      const timer = setTimeout(() => {
        revalidate.load(window.location.href);
        setRetries((r) => r + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data.status, retries, revalidate]);

  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e0d8c8] font-sans flex items-center justify-center px-6">
      {data.status === "verified" ? (
        <Verified email={data.email} />
      ) : data.status === "pending" ? (
        <Pending />
      ) : (
        <Failed />
      )}
    </div>
  );
}

function Verified({ email }: { email: string | null }) {
  return (
    <div className="max-w-md text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="font-display text-3xl md:text-4xl mb-4">
        Welcome to the zoo!
      </h1>
      {email && (
        <p className="text-[#e0d8c8]/70 mb-1">
          A receipt has been sent to {email}.
        </p>
      )}
      <p className="text-[#e0d8c8]/50 text-sm mb-8">
        7 pixel-art animals waiting to meet you.
      </p>
      <a
        href="https://github.com/Synov8/zoo-releases/releases/download/v0.1.2/desktop-zoo_0.1.0_x64-setup.exe"
        className="inline-block bg-[#c8963a] hover:bg-[#b8862e] text-[#1a1410] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
      >
        Download Desktop Zoo
      </a>
      <div className="mt-10 text-left bg-[rgba(255,255,255,0.04)] rounded-2xl p-6 border border-white/5">
        <h2 className="font-display text-lg mb-3 text-[#e0d8c8]">
          Getting started
        </h2>
        <ol className="text-sm text-[#e0d8c8]/60 space-y-2 list-decimal list-inside">
          <li>Download and run the installer</li>
          <li>Launch Desktop Zoo — seven animals appear on your screen</li>
          <li>Move your mouse, type, or just watch them roam</li>
          <li>Right-click the tray icon for settings</li>
        </ol>
      </div>
    </div>
  );
}

function Pending() {
  return (
    <div className="max-w-md text-center">
      <div className="text-5xl mb-6 animate-pulse">⏳</div>
      <h1 className="font-display text-3xl md:text-4xl mb-4">
        Confirming your payment...
      </h1>
      <p className="text-[#e0d8c8]/70">
        Hang tight — your download link will appear automatically.
      </p>
    </div>
  );
}

function Failed() {
  return (
    <div className="max-w-md text-center">
      <div className="text-5xl mb-6">🤔</div>
      <h1 className="font-display text-3xl md:text-4xl mb-4">
        Payment not found
      </h1>
      <p className="text-[#e0d8c8]/70 mb-8">
        Your payment may still be processing. If you completed checkout, try refreshing or contact support.
      </p>
      <a
        href="/"
        className="inline-block bg-[#c8963a] hover:bg-[#b8862e] text-[#1a1410] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
      >
        Back to Home
      </a>
    </div>
  );
}
