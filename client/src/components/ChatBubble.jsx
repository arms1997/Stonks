import { CardContent, Typography, ListItem, Card } from "@material-ui/core";

const ChatBubble = ({ body, username, timestamp, ownedByCurrentUser }) => {
  return (
    <div>
      <ListItem primary="message">
        <Card>
          <CardContent style={{ padding: "6px 10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ marginRight: 10 }} variant="caption">
                {username}
              </Typography>
              <Typography variant="caption">{timestamp}</Typography>
            </div>
            <Typography variant="body2">{body}</Typography>
          </CardContent>
        </Card>
      </ListItem>
    </div>
  );
};

export default ChatBubble;
