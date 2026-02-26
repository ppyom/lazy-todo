CREATE TABLE `review` (
	`id` text PRIMARY KEY NOT NULL,
	`emoji` text NOT NULL,
	`comment` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`is_synced` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `todo` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'IN_PROGRESS',
	`defer_count` integer DEFAULT 0,
	`defer_reason` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`is_synced` integer DEFAULT 0
);
