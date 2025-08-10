CREATE TABLE `businesses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`link` text NOT NULL,
	`imageUrl` text NOT NULL,
	`categories` text DEFAULT (json_array()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`name` text PRIMARY KEY NOT NULL
);
