import { CardContent, Typography, ListItem, Card } from "@material-ui/core";

const ChatBubble = ({ body, ownedByCurrentUser }) => {
  return (
    <div>
      <ListItem primary="message">
        <Card>
          <CardContent style={{ padding: "6px 10px" }}>
            <Typography>{body}</Typography>
          </CardContent>
        </Card>
      </ListItem>
    </div>
  );
};

export default ChatBubble;
