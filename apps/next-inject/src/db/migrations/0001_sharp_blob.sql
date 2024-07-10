CREATE TABLE `transactions` (
	`paymentIntent` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`email` text NOT NULL,
	`priceId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
