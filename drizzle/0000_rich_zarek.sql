CREATE TABLE `options` (
	`id` integer AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`votes` integer NOT NULL,
	`poll_id` integer NOT NULL,
	FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `polls` (
	`id` integer AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
