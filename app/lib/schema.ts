import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const licenses = sqliteTable("licenses", {
  email: text("email").primaryKey(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSessionId: text("stripe_session_id").unique(),
  purchasedAt: integer("purchased_at", { mode: "timestamp_ms" }).notNull(),
});
