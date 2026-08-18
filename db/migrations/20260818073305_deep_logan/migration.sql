DROP INDEX IF EXISTS `user_events_storeId_idx`;--> statement-breakpoint
CREATE INDEX `admin_agent_conversations_store_id_updated_at_idx` ON `admin_agent_conversations` (`store_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `admin_items_created_at_idx` ON `admin_items` (`created_at`);--> statement-breakpoint
CREATE INDEX `admin_items_store_id_created_at_idx` ON `admin_items` (`store_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `admin_notes_updated_at_idx` ON `admin_notes` (`updated_at`);--> statement-breakpoint
CREATE INDEX `admin_notes_store_id_updated_at_idx` ON `admin_notes` (`store_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `user_events_projected_at_seq_num_idx` ON `user_events` (`projected_at`,`seq_num`);--> statement-breakpoint
CREATE INDEX `user_events_store_id_seq_num_idx` ON `user_events` (`store_id`,`seq_num`);