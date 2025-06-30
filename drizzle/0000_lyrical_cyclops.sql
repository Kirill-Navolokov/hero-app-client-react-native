CREATE TABLE `units` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`type` integer NOT NULL,
	`foudationDate` integer NOT NULL,
	`imageUrl` text NOT NULL,
	`socialNetworks` text
);
--> statement-breakpoint
CREATE TABLE `wods` (
	`id` text PRIMARY KEY NOT NULL,
	`unitId` text,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`scheme` text NOT NULL,
	`executionDate` integer NOT NULL,
	`creationDate` integer NOT NULL,
	`type` integer NOT NULL,
	`imageUrl` text NOT NULL,
	`backgroundUrl` text
);
