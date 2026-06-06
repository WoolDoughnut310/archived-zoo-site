import { Resend } from "resend";

export function getResend(env: Env) {
  return new Resend(env.RESEND_API_KEY);
}

export function sendReceiptEmail(env: Env, email: string) {
  const resend = getResend(env);
  const to = import.meta.env.DEV ? ["delivered@resend.dev"] : [email];
  return resend.emails.send({
    from: "Desktop Zoo <noreply@synov8studio.com>",
    to,
    subject: "Your Desktop Zoo receipt",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 32px;">🐱🐶🦊🦉🐼🐧🐰</span>
        </div>
        <h1 style="font-size: 24px; margin: 0 0 8px; text-align: center;">
          Welcome to Desktop Zoo!
        </h1>
        <p style="color: #555; text-align: center; margin: 0 0 24px;">
          Thanks for your purchase. Here's your receipt.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #555;">Product</td>
            <td style="padding: 8px 0; text-align: right;">Desktop Zoo — 7 pixel-art animals</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #eee; color: #555;">Price</td>
            <td style="padding: 8px 0; border-top: 1px solid #eee; text-align: right;">$4.99</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #eee; color: #555;">Email</td>
            <td style="padding: 8px 0; border-top: 1px solid #eee; text-align: right; font-family: monospace;">${email}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px; text-align: center; margin: 0;">
          Desktop Zoo — <a href="https://synov8studio.com" style="color: #888;">Synov8 Studio</a>
        </p>
      </div>
    `,
    tags: [
      { name: "category", value: "receipt" },
    ],
  });
}