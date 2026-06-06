import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy — Desktop Zoo" },
    { name: "description", content: "Desktop Zoo privacy policy." },
  ];
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e0d8c8] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="font-display text-[#c8963a] hover:underline mb-8 inline-block">&larr; Back</a>
        <h1 className="font-display text-3xl md:text-4xl mb-8">Privacy Policy</h1>
        <p className="text-[#e0d8c8]/50 text-sm mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-sm text-[#e0d8c8]/70 leading-relaxed">
          <p>
            Desktop Zoo ("we," "our," or "us") is committed to protecting your privacy. This policy explains what information we collect and how we use it.
          </p>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">Information We Collect</h2>
            <p>
              When you purchase Desktop Zoo, we collect your email address through our payment processor, Stripe. We do not receive or store your payment card details — those are handled entirely by Stripe.
            </p>
            <p className="mt-2">
              The desktop app itself does not collect or transmit any personal information. It runs locally on your machine and only contacts our server to verify your license on startup.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">How We Use Your Information</h2>
            <p>We use your email address solely to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Verify your license when the app checks in</li>
              <li>Send you a purchase receipt</li>
              <li>Contact you about critical updates if necessary</li>
            </ul>
            <p className="mt-2">We will never sell, share, or use your email for marketing or newsletters.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">Third-Party Services</h2>
            <p>
              We use <strong>Stripe</strong> for payment processing and <strong>Resend</strong> for transactional emails. Both services have their own privacy policies governing how they handle your data. We do not share your email with any other third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">Data Retention</h2>
            <p>
              We retain your email address and purchase record for as long as your license is active. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#e0d8c8] mb-2">Contact</h2>
            <p>
              For questions about this policy, contact us at <span className="text-[#c8963a]">support@synov8studio.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
