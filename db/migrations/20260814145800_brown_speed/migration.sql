CREATE TABLE `account` (
	`id` text PRIMARY KEY,
	`account_id` text NOT NULL,
	`issuer` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `jwks` (
	`id` text PRIMARY KEY,
	`public_key` text NOT NULL,
	`private_key` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer,
	`alg` text,
	`crv` text
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL UNIQUE,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`impersonated_by` text,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text,
	`banned` integer,
	`ban_reason` text,
	`ban_expires` integer,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
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
	`text` text DEFAULT '' NOT NULL,
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
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `account_issuer_accountId_uidx` ON `account` (`issuer`,`account_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint
CREATE INDEX `admin_agent_conversations_updated_at_idx` ON `admin_agent_conversations` (`updated_at`);--> statement-breakpoint
CREATE INDEX `user_events_storeId_idx` ON `user_events` (`store_id`);