ALTER TABLE "review" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "deleted_at" timestamp with time zone;