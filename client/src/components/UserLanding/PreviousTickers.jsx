import {
  Card,
  CardContent,
  List,
  Typography,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import React from "react";

export default function PreviousTickers() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const listContent = currentUser.previousTickers
    .map((ticker, index) => (
      <React.Fragment key={index}>
        <Divider />
        <ListItem
          alignItems="center"
          button
          onClick={() =>
            history.push(`ticker/${ticker.symbol}/${ticker.company}`)
          }
        >
          <ListItemText
            primary={
              <div className="userLanding__section-top-rightSide-previousList-item">
                <Typography>
                  <strong>{ticker.symbol.toUpperCase()}</strong>
                </Typography>
                <Typography>{ticker.company}</Typography>
              </div>
            }
          />
        </ListItem>
      </React.Fragment>
    ))
    .reverse();

  return (
    <>
      <Card className="userLanding__header-previousTitle">
        <CardContent style={{ backgroundColor: "#ffb684", color: "white" }}>
          Previously Viewed
        </CardContent>
      </Card>
      <Card>
        <CardContent className="userLanding__section-top-rightSide-previousList">
          <List>{listContent}</List>
        </CardContent>
      </Card>
    </>
  );
}
