CREATE TABLE `synced_state` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`version` integer NOT NULL,
	`updated_at` integer NOT NULL
);
