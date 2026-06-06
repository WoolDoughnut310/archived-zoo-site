import { useFetcher } from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Desktop Zoo — A zoo lives on your desktop." },
    {
      name: "description",
      content:
        "Seven pixel-art animals that live on your screen. Each with its own personality. They roam, react, and keep you company while you work.",
    },
    { property: "og:title", content: "Desktop Zoo — A zoo lives on your desktop." },
    {
      property: "og:description",
      content:
        "Seven pixel-art animals that live on your screen. Each with its own personality. They roam, react, and keep you company while you work.",
    },
    { property: "og:image", content: "/og-image.svg" },
    { property: "og:type", content: "website" },
  ];
}

export default function Index() {
  const fetcher = useFetcher();
  type FetcherData = { url?: string; error?: string };
  const fetcherData = fetcher.data as FetcherData | undefined;

  useEffect(() => {
    if (fetcherData?.url) {
      window.location.href = fetcherData.url;
    }
  }, [fetcherData]);

  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e0d8c8] font-sans">
      <Header />
      <Hero />
      <Features />
      <Animals />
      <Pricing fetcher={fetcher} fetcherData={fetcherData} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
      <span className="font-display text-xl text-[#c8963a] tracking-tight">
        desktop-zoo
      </span>
      <span className="text-sm text-[#e0d8c8]/60">v0.1.1</span>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-6 pt-16 pb-20 max-w-5xl mx-auto text-center">
      <div className="mb-8 flex justify-center">
        <div className="floating-hero">
          <div className="w-72 h-48 rounded-3xl bg-[#c8963a]/10 border border-[#c8963a]/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 space-x-2">
                <span>🐱</span><span>🐶</span><span>🦊</span><span>🦉</span>
                <br />
                <span>🐼</span><span>🐧</span><span>🐰</span>
              </div>
              <div className="text-sm text-[#e0d8c8]/50">Seven pixel pets. One desktop.</div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 text-[#e0d8c8]">
        A zoo lives on
        <br />
        your desktop.
      </h1>
      <p className="text-lg md:text-xl text-[#e0d8c8]/70 max-w-lg mx-auto mb-10">
        Seven pixel-art animals with real personalities. They roam your screen, react to your mouse, and keep you company while you work.
      </p>
      <a
        href="#pricing"
        className="inline-block bg-[#c8963a] hover:bg-[#b8862e] text-[#1a1410] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
      >
        Get Desktop Zoo — $4.99
      </a>
    </section>
  );
}

const features = [
  {
    emoji: "🐾",
    title: "Seven distinct personalities",
    desc: "A cat, dog, fox, owl, panda, penguin, and rabbit — each with unique traits, moods, and behaviors. They react to your mouse, your typing, and each other.",
  },
  {
    emoji: "🧠",
    title: "Reactive state machine",
    desc: "Every animal has its own AI: idle, curious, playful, sleepy, asleep, annoyed, and walking. Pet them, ignore them, or type too fast and watch them react.",
  },
  {
    emoji: "📌",
    title: "Lives on top — out of the way",
    desc: "A transparent, always-on-top window. Click through to your work. They roam freely without interrupting — even push apart from each other so they never overlap.",
  },
  {
    emoji: "🌙",
    title: "30-day offline grace",
    desc: "Buy once, download, play. No subscription. No account needed. Your zoo works offline for a full month between check-ins.",
  },
];

function Features() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl text-center mb-12 text-[#e0d8c8]">
        A tiny ecosystem
        <br />
        <span className="text-[#c8963a]">right on your screen</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-6 bg-[rgba(255,255,255,0.04)] border border-white/5 hover:border-[#c8963a]/30 transition-colors duration-200"
          >
            <div className="text-3xl mb-3">{f.emoji}</div>
            <h3 className="font-display text-xl mb-2 text-[#e0d8c8]">
              {f.title}
            </h3>
            <p className="text-sm text-[#e0d8c8]/60 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const animals = [
  { emoji: "🐱", name: "Cat", desc: "Aloof but affectionate. Curious paws bat at your cursor." },
  { emoji: "🐶", name: "Dog", desc: "Your best friend. Always excited, endlessly patient." },
  { emoji: "🦊", name: "Fox", desc: "A mischievous trickster. Fast, curious, easily distracted." },
  { emoji: "🦉", name: "Owl", desc: "Wise and sleepy. Keeps to itself, moves slow." },
  { emoji: "🐼", name: "Panda", desc: "Laid-back and patient. Naps more than it plays." },
  { emoji: "🐧", name: "Penguin", desc: "Friendly and social. Waddles around with a short fuse." },
  { emoji: "🐰", name: "Rabbit", desc: "Energetic and jumpy. A shy ball of zoom." },
];

function Animals() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl text-center mb-4 text-[#e0d8c8]">
        Meet the residents
      </h2>
      <p className="text-center text-[#e0d8c8]/60 mb-10 max-w-md mx-auto">
        Each animal is hand-crafted pixel art with its own personality profile, mood states, and behavioral traits.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animals.map((a) => (
          <div
            key={a.name}
            className="rounded-2xl p-5 bg-[rgba(255,255,255,0.04)] border border-white/5 text-center hover:border-[#c8963a]/30 transition-colors duration-200"
          >
            <div className="text-4xl mb-2">{a.emoji}</div>
            <h3 className="font-display text-lg text-[#e0d8c8]">{a.name}</h3>
            <p className="text-xs text-[#e0d8c8]/50 mt-1">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing({
  fetcher,
  fetcherData,
}: {
  fetcher: ReturnType<typeof useFetcher>;
  fetcherData: { url?: string; error?: string } | undefined;
}) {
  return (
    <section id="pricing" className="px-6 py-20 max-w-5xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-4xl mb-4 text-[#e0d8c8]">
        One price. Forever.
      </h2>
      <p className="text-[#e0d8c8]/60 mb-10">No subscriptions. No hidden fees.</p>
      <div className="max-w-sm mx-auto rounded-3xl p-8 bg-[rgba(255,255,255,0.04)] border border-white/5">
        <div className="font-display text-5xl text-[#c8963a] mb-1">$4.99</div>
        <div className="text-sm text-[#e0d8c8]/50 mb-6">one-time purchase</div>
        <ul className="text-left text-sm space-y-2 mb-8 text-[#e0d8c8]/70">
          <li className="flex items-center gap-2">
            <span className="text-[#c8963a]">✓</span> All 7 pixel-art animals
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#c8963a]">✓</span> 30-day offline mode
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#c8963a]">✓</span> All future updates
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#c8963a]">✓</span> No account required
          </li>
        </ul>
        <fetcher.Form method="POST" action="/api/checkout">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-white/10 text-[#e0d8c8] placeholder:text-[#e0d8c8]/30 mb-3 focus:outline-none focus:border-[#c8963a]/50 transition-colors"
          />
          {fetcherData?.error && (
            <p className="text-sm text-red-400 mb-3 text-left">{fetcherData.error}</p>
          )}
          <button
            type="submit"
            disabled={fetcher.state !== "idle"}
            className="w-full bg-[#c8963a] hover:bg-[#b8862e] disabled:opacity-50 text-[#1a1410] font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
          >
            {fetcher.state !== "idle" ? "Redirecting..." : "Buy Now — $4.99"}
          </button>
        </fetcher.Form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-8 text-center text-xs text-[#e0d8c8]/30 border-t border-white/5 space-y-2">
      <p>&copy; {new Date().getFullYear()} Synov8 Studio</p>
      <div className="space-x-4">
        <a href="/terms" className="hover:text-[#c8963a] transition-colors">Terms</a>
        <a href="/privacy" className="hover:text-[#c8963a] transition-colors">Privacy</a>
      </div>
    </footer>
  );
}
