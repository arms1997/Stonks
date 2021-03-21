const ENV = require("./environment");
const PORT = process.env.PORT || 8000;

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyparser.json());

const http = require("http");

//Routes

const watchRoutes = require("./routes/watches");
const tickerRoutes = require("./routes/tickers");
const newsRoutes = require("./routes/news");
const likeRoutes = require("./routes/likes");
const userRoutes = require("./routes/users");

//DB helpers

const db_watches = require("./db/helpers/db_watches_helpers");
const db_likes = require("./db/helpers/db_likes_helpers");
const db_users = require("./db/helpers/db_user_helpers");

//Routers

const watchRouter = watchRoutes(db_watches);
app.use("/api/watch", watchRouter);

const tickerRouter = tickerRoutes();
app.use("/api/tickers", tickerRouter);

const newsRouter = newsRoutes();
app.use("/api/news", newsRouter);
const likeRouter = likeRoutes(db_likes);
app.use("/api/like", likeRouter);

const userRouter = userRoutes(db_users);
app.use("/api/user", userRouter);

const server = http.createServer(app);
const io = require("./server")(server);

server.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
