const ENV = require("./environment");
const PORT = process.env.PORT || 8008;

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyparser.json());

const watchRoutes = require("./routes/watches");
const tickerRoutes = require("./routes/tickers");
const newsRoutes = require("./routes/news");

const db_watches = require("./db/helpers/db_watches_helpers");

const watchRouter = watchRoutes(db_watches);
app.use("/api/watch", watchRouter);

const tickerRouter = tickerRoutes();
app.use("/api/tickers", tickerRouter);

const newsRouter = newsRoutes();
app.use("/api/news", newsRouter);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
