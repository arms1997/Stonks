import { useEffect, useState } from "react";
import { useLoading, Audio } from "@agney/react-loading";

import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";
import { Card, CardActions, IconButton, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

  const { currentUser, addLike, updateLike, createWatch } = useAuth();

  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Audio width="100" />,
  });

  useEffect(() => {
    setLiked(false);
    if (
      currentUser &&
      currentUser.likes.some((like) => like.ticker === symbol && like.is_active)
    ) {
      setLiked(true);
    }
  }, [currentUser, symbol]);

  const _handleLikeClick = (currentUser) => {
    const index = currentUser.likes.findIndex((like) => like.ticker === symbol);

    if (index !== -1) {
      const { id } = currentUser.likes[index];

      updateLike(id, index).then(() => setLiked(!liked));
    } else {
      addLike(currentUser.user_id, symbol).then(() => setLiked(true));
    }
  };

  const _handleWatchClick = (currentUser) => {
    createWatch(currentUser.user_id, symbol, 800);
  };

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
            <IconButton onClick={() => _handleLikeClick(currentUser)}>
              <FavoriteIcon color={liked ? "primary" : "inherit"} />
            </IconButton>
            <IconButton onClick={() => _handleWatchClick(currentUser)}>
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
