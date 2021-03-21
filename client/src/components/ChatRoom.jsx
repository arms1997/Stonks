import {
  Card,
  CardContent,
  CardHeader,
  List,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import useChat from "../Hooks/useChat";
import ChatBubble from "./ChatBubble";
import { useAuth } from "../contexts/AuthContext";

const ChatRoom = ({ company }) => {
  const { messages, sendMessage } = useChat(company);
  const [value, setValue] = useState("");
  const { currentUser } = useAuth();

  const listContent = messages.map((message, index) => {
    return (
      <ChatBubble
        key={index}
        body={message.body}
        username={message.username}
        timestamp={message.timestamp}
        ownedByCurrentUser={message.ownedByCurrentUser}
      />
    );
  });

  const handleSendMessage = () => {
    if (value.length) {
      currentUser
        ? sendMessage(value, currentUser.username)
        : sendMessage(value);
      setValue("");
    }
  };

  const onEnterPressed = (e) => {
    if (e.key === "Enter" && value.length) {
      currentUser
        ? sendMessage(value, currentUser.username)
        : sendMessage(value);
      setValue("");
    }
  };

  return (
    <Card style={{ maxHeight: 500, marginBottom: 40 }}>
      <CardHeader
        subheader="Chat"
        style={{ backgroundColor: "#825c79" }}
      ></CardHeader>
      <CardContent style={{ height: 300, overflow: "auto" }}>
        <List>{listContent}</List>
      </CardContent>
      <CardContent>
        <TextField
          label="Message"
          variant="standard"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{ width: "80%", marginBottom: "5px" }}
          onKeyDown={onEnterPressed}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;
