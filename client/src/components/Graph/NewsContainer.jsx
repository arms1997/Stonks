import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from "@material-ui/core";

import React from "react";

import NewsCard from "./NewsCard";

const useStyles = makeStyles({
  root: {
    width: 350,
    maxHeight: 450,
    margin: "100px 10px 0px 10px",
    overflow: "auto",
  },
  header: {
    backgroundColor: "#7ca5ce",
    color: "white",
  },
});

const relevantNewsFormatter = (relevantNews) => {
  if (Array.isArray(relevantNews)) {
    return relevantNews;
  } else if (typeof relevantNews === "object") {
    return Object.values(relevantNews).flat();
  }
};

export default function NewsContainer({ relevantNews }) {
  const classes = useStyles();

  const arr = relevantNewsFormatter(relevantNews);

  const newsListItems = arr.map((news, index) => {
    return <NewsCard key={index} news={news} />;
  });

  const noNews = (
    <React.Fragment>
      <Divider />
      <ListItem alignItems="center">
        <ListItemText primary={"Sorry seems like theres no relevant news"} />
      </ListItem>
    </React.Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        subheader={<Typography>Relevant News</Typography>}
      ></CardHeader>
      <CardContent>
        <List>{newsListItems.length ? newsListItems : noNews}</List>
      </CardContent>
    </Card>
  );
}
