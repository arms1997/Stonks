const pg = require("pg");

require("dotenv").config();

const client = new pg.Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://epjiwekverdfrk:90acd35c69af460c9877c207efe3091d200be25ed21f5be4d7c9f52bfcf17b58@ec2-18-204-101-137.compute-1.amazonaws.com:5432/dafm6mu2f5rj7u",
  ssl: {
    rejectUnauthorized: false,
  },
  // `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=disable`,
});

client
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
