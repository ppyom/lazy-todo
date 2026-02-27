CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"emoji" text NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"status" text DEFAULT 'IN_PROGRESS' NOT NULL,
	"defer_count" integer DEFAULT 0 NOT NULL,
	"defer_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
