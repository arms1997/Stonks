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

const ChatRoom = ({ company }) => {
  const { messages, sendMessage } = useChat(company);
  const [value, setValue] = useState("");

  const listContent = messages.map((message, index) => {
    return (
      <ChatBubble
        key={index}
        body={message.body}
        ownedByCurrentUser={message.ownedByCurrentUser}
      />
    );
  });

  const handleSendMessage = () => {
    sendMessage(value);
    setValue("");
  };

  return (
    <Card style={{ maxHeight: 500, width: 300 }}>
      <CardHeader title="Chat"></CardHeader>
      <CardContent style={{ height: 300, overflow: "auto" }}>
        <List>{listContent}</List>
      </CardContent>
      <CardContent>
        <TextField
          label="Message"
          variant="standard"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </CardContent>
    </Card>
  );
};

export default ChatRoom;
