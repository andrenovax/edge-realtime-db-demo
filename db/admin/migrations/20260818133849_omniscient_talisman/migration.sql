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
CREATE TABLE `admin_items` (
	`store_id` text NOT NULL,
	`id` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT 0 NOT NULL,
	CONSTRAINT `admin_items_pk` PRIMARY KEY(`store_id`, `id`)
);
--> statement-breakpoint
CREATE TABLE `admin_notes` (
	`store_id` text NOT NULL,
	`id` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`text` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`updated_at` integer DEFAULT 0 NOT NULL,
	`seq_num` integer NOT NULL,
	CONSTRAINT `admin_notes_pk` PRIMARY KEY(`store_id`, `id`)
);
--> statement-breakpoint
CREATE TABLE `user_events` (
	`id` text PRIMARY KEY,
	`store_id` text NOT NULL,
	`name` text NOT NULL,
	`args` text NOT NULL,
	`seq_num` integer NOT NULL,
	`client_id` text NOT NULL,
	`projected_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `admin_agent_conversations_updated_at_idx` ON `admin_agent_conversations` (`updated_at`);--> statement-breakpoint
CREATE INDEX `admin_agent_conversations_store_id_updated_at_idx` ON `admin_agent_conversations` (`store_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `admin_items_created_at_idx` ON `admin_items` (`created_at`);--> statement-breakpoint
CREATE INDEX `admin_items_store_id_created_at_idx` ON `admin_items` (`store_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `admin_notes_updated_at_idx` ON `admin_notes` (`updated_at`);--> statement-breakpoint
CREATE INDEX `admin_notes_store_id_updated_at_idx` ON `admin_notes` (`store_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `user_events_projected_at_seq_num_idx` ON `user_events` (`projected_at`,`seq_num`);--> statement-breakpoint
CREATE INDEX `user_events_store_id_seq_num_idx` ON `user_events` (`store_id`,`seq_num`);
