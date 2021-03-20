import { useEffect, useState } from "react";
import { useLoading, Audio } from "@agney/react-loading";

import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";
import {
  Card,
  CardActions,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Popper,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
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
  const [watch, setWatch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("");
  const classes = useStyles();

  const {
    currentUser,
    addLike,
    updateLike,
    createWatch,
    updateWatch,
  } = useAuth();

  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Audio width="100" />,
  });

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
      addLike(currentUser.user_id, symbol).then(() => setLiked(true));
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
    createWatch(currentUser.user_id, symbol, value).then(() => {
      setWatch(true);
      setAnchorEl(null);
    });
  };

  const _handleWatchUpdate = () => {
    const index = currentUser.watches.findIndex(
      (watch) => watch.ticker === symbol
    );

    if (index !== -1) {
      const { id } = currentUser.likes[index];

      updateLike(id, index).then(() => setLiked(!liked));
    } else {
      addLike(currentUser.user_id, symbol).then(() => setLiked(true));
    }
  };

  const _handleDeleteClick = (watchId) => {
    const index = currentUser.watches.findIndex(
      (watch) => watch.ticker === symbol && watch["is_active"]
    );

    const watch = currentUser.watches.find((watch) => {
      return watch.ticker === symbol && watch["is_active"];
    });

    updateWatch(watch.id, index)
      .then(() => {
        setWatch(false);
        setAnchorEl(null);
        setValue("");
      })
      .catch((err) => console.error(err));
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
          height={500}
        />
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
      </Card>
      <div className="ticker__bottom">
        <NewsList symbol={symbol} company={company} />
        <div className="ticker__bottom-detail">
          <Detail symbol={symbol} />
        </div>
      </div>
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
    </div>
  );
}
