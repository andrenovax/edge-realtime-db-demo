ALTER TABLE `admin_notes` ADD `text_seq_num` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `admin_notes` ADD `title_seq_num` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `admin_notes` ADD `status_seq_num` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
UPDATE `admin_notes`
SET
	`text_seq_num` = `seq_num`,
	`title_seq_num` = `seq_num`,
	`status_seq_num` = `seq_num`;
