DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS watches CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS usermessage_ref CASCADE;

CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "phone_number" varchar
);

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "ticker" varchar,
  "is_active" boolean DEFAULT true
);

CREATE TABLE "watches" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "ticker" varchar,
  "value" int,
  "is_active" boolean DEFAULT true
);

CREATE TABLE "friends" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "friend_id" int
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "message_body" varchar
);

CREATE TABLE "user_message_ref" (
  "id" SERIAL PRIMARY KEY,
  "message_id" int,
  "user_id" int,
  "is_sender" boolean
);

ALTER TABLE "users" ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

ALTER TABLE "messages" ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

ALTER TABLE "likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "watches" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("friend_id") REFERENCES "users" ("id");

ALTER TABLE "user_message_ref" ADD FOREIGN KEY ("message_id") REFERENCES "messages" ("id");

ALTER TABLE "user_message_ref" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
