import { useEffect, useRef, useState } from "react";

import socketIOClient from "socket.io-client";
import moment from "moment";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "https://stonks-lhl.herokuapp.com/";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    //create websocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    //cleanup aka close socket connection when connection is closed
    return () => {
      setMessages([]);
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody, username = "randomUser123") => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      username: username,
      body: messageBody,
      timestamp: moment().format("h:mm a"),
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
