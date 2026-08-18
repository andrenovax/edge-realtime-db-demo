CREATE TABLE `__new_user` (
	`id` text NOT NULL PRIMARY KEY,
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
);--> statement-breakpoint
INSERT INTO `__new_user` (
	`id`, `name`, `email`, `email_verified`, `image`, `role`, `banned`,
	`ban_reason`, `ban_expires`, `created_at`, `updated_at`
)
SELECT
	`id`, `name`, `email`, `email_verified`, `image`, `role`, `banned`,
	`ban_reason`, `ban_expires`, `created_at`, `updated_at`
FROM `user`;--> statement-breakpoint

CREATE TABLE `__new_session` (
	`id` text NOT NULL PRIMARY KEY,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL UNIQUE,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`impersonated_by` text,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `__new_user`(`id`) ON DELETE CASCADE
);--> statement-breakpoint
INSERT INTO `__new_session` (
	`id`, `expires_at`, `token`, `created_at`, `updated_at`, `ip_address`,
	`user_agent`, `impersonated_by`, `user_id`
)
SELECT
	`id`, `expires_at`, `token`, `created_at`, `updated_at`, `ip_address`,
	`user_agent`, `impersonated_by`, `user_id`
FROM `session`;--> statement-breakpoint

CREATE TABLE `__new_account` (
	`id` text NOT NULL PRIMARY KEY,
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
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `__new_user`(`id`) ON DELETE CASCADE
);--> statement-breakpoint
INSERT INTO `__new_account` (
	`id`, `account_id`, `issuer`, `provider_id`, `user_id`, `access_token`,
	`refresh_token`, `id_token`, `access_token_expires_at`,
	`refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at`
)
SELECT
	`id`, `account_id`, `issuer`, `provider_id`, `user_id`, `access_token`,
	`refresh_token`, `id_token`, `access_token_expires_at`,
	`refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at`
FROM `account`;--> statement-breakpoint

DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `account_issuer_accountId_uidx` ON `account` (`issuer`,`account_id`);--> statement-breakpoint

CREATE TABLE `__new_verification` (
	`id` text NOT NULL PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);--> statement-breakpoint
INSERT INTO `__new_verification` (
	`id`, `identifier`, `value`, `expires_at`, `created_at`, `updated_at`
)
SELECT `id`, `identifier`, `value`, `expires_at`, `created_at`, `updated_at`
FROM `verification`;--> statement-breakpoint
DROP TABLE `verification`;--> statement-breakpoint
ALTER TABLE `__new_verification` RENAME TO `verification`;--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);--> statement-breakpoint

CREATE TABLE `__new_jwks` (
	`id` text NOT NULL PRIMARY KEY,
	`public_key` text NOT NULL,
	`private_key` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer,
	`alg` text,
	`crv` text
);--> statement-breakpoint
INSERT INTO `__new_jwks` (
	`id`, `public_key`, `private_key`, `created_at`, `expires_at`, `alg`, `crv`
)
SELECT `id`, `public_key`, `private_key`, `created_at`, `expires_at`, `alg`, `crv`
FROM `jwks`;--> statement-breakpoint
DROP TABLE `jwks`;--> statement-breakpoint
ALTER TABLE `__new_jwks` RENAME TO `jwks`;--> statement-breakpoint

CREATE TABLE `__new_user_events` (
	`id` text NOT NULL PRIMARY KEY,
	`store_id` text NOT NULL,
	`name` text NOT NULL,
	`args` text NOT NULL,
	`seq_num` integer NOT NULL,
	`client_id` text NOT NULL,
	`projected_at` integer NOT NULL
);--> statement-breakpoint
INSERT INTO `__new_user_events` (
	`id`, `store_id`, `name`, `args`, `seq_num`, `client_id`, `projected_at`
)
SELECT `id`, `store_id`, `name`, `args`, `seq_num`, `client_id`, `projected_at`
FROM `user_events`;--> statement-breakpoint
DROP TABLE `user_events`;--> statement-breakpoint
ALTER TABLE `__new_user_events` RENAME TO `user_events`;--> statement-breakpoint
CREATE INDEX `user_events_projected_at_seq_num_idx` ON `user_events` (`projected_at`,`seq_num`);--> statement-breakpoint
CREATE INDEX `user_events_store_id_seq_num_idx` ON `user_events` (`store_id`,`seq_num`);
