const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server);

  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

  io.on("connection", (socket) => {
    //Join a convo
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    //listen for new users
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    //leave room is the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};
