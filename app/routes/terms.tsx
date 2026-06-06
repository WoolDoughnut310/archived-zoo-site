import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service — Desktop Zoo" },
    { name: "description", content: "Desktop Zoo terms of service." },
  ];
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e0d8c8] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="font-display text-[#c8963a] hover:underline mb-8 inline-block">&larr; Back</a>
        <h1 className="font-display text-3xl md:text-4xl mb-8">Terms of Service</h1>
        <p className="text-[#e0d8c8]/50 text-sm mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-sm text-[#e0d8c8]/70 leading-relaxed">
          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">1. License</h2>
            <p>
              Desktop Zoo ("the Software") is sold as a one-time purchase. Upon payment, you receive a perpetual, non-transferable, non-exclusive license to install and use the Software on your personal devices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">2. Usage</h2>
            <p>You may:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Install and use the Software on any device you own</li>
              <li>Use the Software for personal, non-commercial purposes</li>
            </ul>
            <p className="mt-2">You may not:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Redistribute, resell, or sublicense the Software</li>
              <li>Modify, reverse-engineer, or create derivative works</li>
              <li>Use the Software in a way that violates applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">3. Refunds</h2>
            <p>
              Due to the digital nature of the Software, all sales are final. If you experience a technical issue, contact us and we will work to resolve it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">4. Disclaimer</h2>
            <p>
              The Software is provided "as is" without warranty of any kind. We are not liable for any damages arising from the use of the Software.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">5. Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the Software after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">6. Contact</h2>
            <p>
              For questions about these terms, contact us at <span className="text-[#c8963a]">support@synov8studio.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
