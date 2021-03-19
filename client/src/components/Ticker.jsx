import { useEffect, useState } from "react";
import { useLoading, Audio } from "@agney/react-loading";

import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";
import { Card, CardActions, IconButton, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { blue } from "@material-ui/core/colors";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  cardBottom: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function Ticker({ symbol, company }) {
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const classes = useStyles();

  const { currentUser } = useAuth();

  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Audio width="100" />,
  });

  useEffect(() => {
    if (currentUser.likes.includes(symbol)) {
      setLiked(true);
    }
  }, [currentUser, symbol]);

  return (
    <div className="ticker">
      <Card>
        <section {...containerProps}>{indicatorEl}</section>
        <Graph
          symbol={symbol}
          company={company}
          showNews={true}
          loading={loading}
          setLoading={setLoading}
        />
        <CardActions className={classes.cardBottom}>
          <div>
            <IconButton onClick={() => setLiked(!liked)}>
              <FavoriteIcon color={liked ? "primary" : "inherit"} />
            </IconButton>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
      {/* {!loading && ( */}
      <div className="ticker__bottom">
        <NewsList symbol={symbol} company={company} />
        <div className="ticker__bottom-detail">
          <Detail symbol={symbol} />
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
