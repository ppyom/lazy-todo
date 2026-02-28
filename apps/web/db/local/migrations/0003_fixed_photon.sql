PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_review` (
	`id` text PRIMARY KEY NOT NULL,
	`emoji` text NOT NULL,
	`comment` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')) NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')) NOT NULL,
	`deleted_at` text,
	`is_synced` integer DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_review`("id", "emoji", "comment", "created_at", "updated_at", "deleted_at", "is_synced") SELECT "id", "emoji", "comment", "created_at", "updated_at", "deleted_at", "is_synced" FROM `review`;--> statement-breakpoint
DROP TABLE `review`;--> statement-breakpoint
ALTER TABLE `__new_review` RENAME TO `review`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_todo` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'IN_PROGRESS' NOT NULL,
	`defer_count` integer DEFAULT 0 NOT NULL,
	`defer_reason` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')) NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')) NOT NULL,
	`deleted_at` text,
	`is_synced` integer DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_todo`("id", "content", "status", "defer_count", "defer_reason", "created_at", "updated_at", "deleted_at", "is_synced") SELECT "id", "content", "status", "defer_count", "defer_reason", "created_at", "updated_at", "deleted_at", "is_synced" FROM `todo`;--> statement-breakpoint
DROP TABLE `todo`;--> statement-breakpoint
ALTER TABLE `__new_todo` RENAME TO `todo`;