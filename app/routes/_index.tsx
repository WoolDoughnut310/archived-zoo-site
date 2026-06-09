import { useEffect, useState } from "react";
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
  const [ZooComponent, setZooComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("../components/ZooBackground").then((m) => setZooComponent(() => m.default));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e0d8c8] font-sans">
      {ZooComponent && <ZooComponent />}
      <Header />
      <Hero />
      <Features />
      <Animals />
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
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#e0d8c8]/60">v0.2.0</span>
        <a href="https://github.com/synov8/zoo" target="_blank" rel="noopener noreferrer" className="text-[#e0d8c8]/40 hover:text-[#e0d8c8] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
          </svg>
        </a>
      </div>
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
        href="https://github.com/Synov8/zoo/releases/download/v0.2.0/desktop-zoo_0.2.0_x64-setup.exe"
        className="inline-block bg-[#c8963a] hover:bg-[#b8862e] text-[#1a1410] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
      >
        Download Desktop Zoo — Free
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
    title: "Fully offline",
    desc: "No account, no subscription, no data collected. Just download and go. Your zoo runs entirely on your machine.",
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
