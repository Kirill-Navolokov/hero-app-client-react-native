CREATE TABLE `advices` (
	`author` text PRIMARY KEY NOT NULL,
	`advices` text DEFAULT (json_array()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`question` text PRIMARY KEY NOT NULL,
	`answer` text NOT NULL
);
