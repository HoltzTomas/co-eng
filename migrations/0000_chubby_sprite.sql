CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
