CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`paymentIntent` text NOT NULL,
	`userId` text NOT NULL,
	`priceId` text NOT NULL,
	`productName` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
