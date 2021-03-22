import {
  CardContent,
  Typography,
  ListItem,
  Card,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },

  altroot: {
    display: "flex",
    justifyContent: "flex-start",
  },

  me: {
    backgroundColor: "#e6e9ea",
    justifyContent: "flex-end",
  },

  notMe: {
    backgroundColor: "#808386",
    color: "white",
    alignSelf: "flex-start",
  },
});

const ChatBubble = ({ body, username, timestamp, ownedByCurrentUser }) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        className={ownedByCurrentUser ? classes.root : classes.altRoot}
        primary="message"
      >
        <Card className={ownedByCurrentUser ? classes.me : classes.notMe}>
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
