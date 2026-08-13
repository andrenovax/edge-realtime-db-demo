CREATE TABLE `user_events` (
	`id` text PRIMARY KEY NOT NULL,
	`store_id` text NOT NULL,
	`name` text NOT NULL,
	`args` text NOT NULL,
	`seq_num` integer NOT NULL,
	`client_id` text NOT NULL,
	`projected_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_events_storeId_idx` ON `user_events` (`store_id`);