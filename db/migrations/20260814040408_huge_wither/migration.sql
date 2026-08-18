-- Better Auth 1.7 scopes account identities by (issuer, account_id).
-- This app has only ever enabled credential auth. Fail before modifying data
-- if an unexpected provider exists so its trusted issuer can be mapped by hand.
CREATE TABLE `__account_provider_guard` (
	`provider_id` text CHECK (`provider_id` = 'credential')
);--> statement-breakpoint
INSERT INTO `__account_provider_guard` (`provider_id`)
SELECT DISTINCT `provider_id` FROM `account`;--> statement-breakpoint
DROP TABLE `__account_provider_guard`;--> statement-breakpoint

CREATE TABLE `__new_account` (
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
);--> statement-breakpoint
INSERT INTO `__new_account` (
	`id`, `account_id`, `issuer`, `provider_id`, `user_id`, `access_token`,
	`refresh_token`, `id_token`, `access_token_expires_at`,
	`refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at`
)
SELECT
	`id`, `account_id`, 'local:credential', `provider_id`, `user_id`, `access_token`,
	`refresh_token`, `id_token`, `access_token_expires_at`,
	`refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at`
FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `account_issuer_accountId_uidx` ON `account` (`issuer`,`account_id`);
