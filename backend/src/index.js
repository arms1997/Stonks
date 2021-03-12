const ENV = require("./environment");
const PORT = process.env.PORT || 8000;

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./db");

app.use(cors());
app.use(bodyparser.json());

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
