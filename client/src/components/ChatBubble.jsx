import { CardContent, Typography, ListItem, Card } from "@material-ui/core";

const ChatBubble = ({ body, ownedByCurrentUser }) => {
  return (
    <div>
      <ListItem primary="message">
        <Card>
          <CardContent>
            <Typography>{ownedByCurrentUser ? "hello" : "goodbye"}</Typography>
            <Typography>{body}</Typography>
          </CardContent>
        </Card>
      </ListItem>
    </div>
  );
};

export default ChatBubble;
