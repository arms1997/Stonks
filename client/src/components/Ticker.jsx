import { useEffect, useState } from "react";

import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";
import {
  Card,
  CardActions,
  IconButton,
  makeStyles,
  TextField,
  Popper,
  CardContent,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../contexts/AuthContext";
import ChatRoom from "./ChatRoom";

const useStyles = makeStyles({
  cardBottom: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function Ticker({ symbol, company }) {
  const [liked, setLiked] = useState(false);
  const [watch, setWatch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const classes = useStyles();

  const {
    currentUser,
    addLike,
    updateLike,
    createWatch,
    removeWatch,
    updateWatch,
  } = useAuth();

  useEffect(() => {
    setLiked(false);
    setWatch(false);
    setValue("");

    if (currentUser) {
      const like = currentUser.likes.some((like) => {
        return like.ticker === symbol && like.is_active;
      });
      if (like) {
        setLiked(true);
      }

      const watch = currentUser.watches.find(
        (watch) => watch.ticker === symbol && watch.is_active
      );

      if (watch) {
        console.log(watch);
        setValue(watch.value);
        setWatch(true);
      }
    }
  }, [currentUser, symbol]);

  const _handleLikeClick = (currentUser) => {
    const index = currentUser.likes.findIndex((like) => like.ticker === symbol);

    if (index !== -1) {
      const { id } = currentUser.likes[index];

      updateLike(id, index).then(() => setLiked(!liked));
    } else {
      addLike(currentUser.user_id, symbol, company).then(() => setLiked(true));
    }
  };

  const _handleWatchClick = (currentUser, event) => {
    // createWatch(currentUser.user_id, symbol, 800);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const _handleCheckClick = (currentUser, symbol, value) => {
    if (!value.length) {
      return;
    }

    const index = currentUser.watches.findIndex(
      (watch) => watch.ticker === symbol
    );

    if (index !== -1) {
      const { id } = currentUser.watches[index];

      updateWatch(id, index, value).then(() => {
        setWatch(true);
        setAnchorEl(null);
      });
    } else {
      createWatch(currentUser.user_id, symbol, value).then(() => {
        setWatch(true);
        setAnchorEl(null);
      });
    }
  };

  const _handleDeleteClick = (watchId) => {
    const index = currentUser.watches.findIndex(
      (watch) => watch.ticker === symbol && watch["is_active"]
    );

    const watch = currentUser.watches.find((watch) => {
      return watch.ticker === symbol && watch["is_active"];
    });

    removeWatch(watch.id, index)
      .then(() => {
        setWatch(false);
        setAnchorEl(null);
        setValue("");
      })
      .catch((err) => console.error(err));
  };

  const watchPopper = () => {
    return (
      <Popper anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
        <Card>
          <CardActions>
            <TextField
              label="Value"
              placeholder="Set Watch Value"
              variant="outlined"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <IconButton
              onClick={() => _handleCheckClick(currentUser, symbol, value)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => _handleDeleteClick()}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Popper>
    );
  };

  const graphButtons = () => {
    return (
      <CardActions className={classes.cardBottom}>
        <div>
          <IconButton onClick={() => _handleLikeClick(currentUser)}>
            <FavoriteIcon color={liked ? "primary" : "inherit"} />
          </IconButton>
          <IconButton
            onClick={(event) => _handleWatchClick(currentUser, event)}
          >
            <VisibilityIcon color={watch ? "primary" : "inherit"} />
          </IconButton>
        </div>
      </CardActions>
    );
  };

  return (
    <div className="ticker">
      <Card>
        <CardContent className="ticker__border" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Graph
            symbol={symbol}
            company={company}
            showNews={true}
            height={500}
          />
        </div>
        {graphButtons()}
      </Card>
      <div className="ticker__bottom">
        <NewsList symbol={symbol} company={company} />
        <div className="ticker__bottom-detail">
          <ChatRoom company={company} />
          <Detail symbol={symbol} />
        </div>
      </div>
      {watchPopper()}
    </div>
  );
}
