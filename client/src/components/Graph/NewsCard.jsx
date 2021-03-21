import { Divider, ListItem, ListItemText, Typography } from "@material-ui/core";

import React from "react";

import moment from "moment";

export default function NewsCard({ news }) {
  return (
    <React.Fragment>
      <Divider />
      <ListItem
        alignItems="center"
        button
        onClick={() => window.open(news.url)}
      >
        <ListItemText
          primary={news.title}
          secondary={
            <React.Fragment>
              <Typography>
                {moment(news.publishedAt).format("YYYY-MM-DD")}
              </Typography>
              <Typography>{news.source}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  );
}
