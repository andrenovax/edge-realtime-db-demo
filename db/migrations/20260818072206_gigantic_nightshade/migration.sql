CREATE TABLE `admin_agent_conversations` (
	`store_id` text NOT NULL,
	`id` text NOT NULL,
	`agent_name` text NOT NULL,
	`model_variant` text NOT NULL,
	`title` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`seq_num` integer NOT NULL,
	CONSTRAINT `admin_agent_conversations_pk` PRIMARY KEY(`store_id`, `id`)
);
--> statement-breakpoint
ALTER TABLE `jwks` ADD `alg` text;--> statement-breakpoint
ALTER TABLE `jwks` ADD `crv` text;--> statement-breakpoint
ALTER TABLE `admin_notes` ADD `title` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `admin_notes` ADD `status` text DEFAULT 'active' NOT NULL;--> statement-breakpoint
CREATE INDEX `admin_agent_conversations_updated_at_idx` ON `admin_agent_conversations` (`updated_at`);