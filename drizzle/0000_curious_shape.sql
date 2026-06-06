CREATE TABLE `licenses` (
	`email` text PRIMARY KEY NOT NULL,
	`stripe_customer_id` text,
	`stripe_session_id` text,
	`purchased_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `licenses_stripe_session_id_unique` ON `licenses` (`stripe_session_id`);