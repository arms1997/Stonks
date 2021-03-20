import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  List,
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

  const newsListItems = arr.map((news) => {
    return <NewsCard news={news} />;
  });

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{
          backgroundColor: "#f0ead6",
        }}
        subheader="Relevant News"
      ></CardHeader>
      <CardContent>
        <List>{newsListItems}</List>
      </CardContent>
    </Card>
  );
}
