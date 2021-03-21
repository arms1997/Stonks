const ENV = require("./environment");
const PORT = process.env.PORT || 8000;

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();

app.use(cors());
app.use(bodyparser.json());

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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  //Join a convo

  const { roomId } = socket.handshake.query;
  console.log(roomId);
  socket.join(roomId);

  //listen for new users
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log(data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  //leave room is the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
