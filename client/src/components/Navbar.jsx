import { AppBar, Button, CircularProgress, Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import NightsStayIcon from "@material-ui/icons/NightsStay";

import axios from "axios";
import { useEffect, useState } from "react";

import "./Navbar.scss";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "6%",
    display: "flex",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    minHeight: "100%",
  },
  search: {
    width: "50%",
    height: 40,
  },
  text: {
    marginTop: 0,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser, logout } = useAuth();

  console.log(anchorEl);

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      // setError("Failed to log out");
    }
  }

  const _onHomeClick = () => {
    history.push("/");
  };

  const _onAccountClick = () => {
    history.push("/me");
  };

  const _handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let mounted = true;

    axios
      .get("/api/tickers")
      .then((data) => {
        if (mounted) {
          setOptions(data.data.companies);
          setLoading(false);
        }
      })
      .catch((err) => console.error({ err: err.message }));

    return () => {
      mounted = false;
    };
  }, []);

  const optionComponent = (option) => {
    return (
      <div className="navbar__autocomplete-option">
        <p className="navbar__autocomplete-option-p">
          {option.symbol.toUpperCase()}
        </p>
        <p className="navbar__autocomplete-option-p">{option.shortName}</p>
      </div>
    );
  };

  return (
    <div>
      <AppBar position={"fixed"} color={"transparent"} className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <img
            src="./images/stonks.svg"
            className="navbar__image"
            onClick={_onHomeClick}
          />
          <Autocomplete
            className={classes.search}
            renderOption={(option) => optionComponent(option)}
            options={options}
            getOptionLabel={(option) => `${option.symbol.toUpperCase()} `}
            groupBy={() => "Symbol"}
            loading={loading}
            renderInput={(params) => (
              <TextField
                className={classes.text}
                {...params}
                label="Search Stock"
                variant="outlined"
                margin="dense"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          {currentUser ? (
            <div className="navbar__buttons">
              <IconButton
                style={{ color: "#43464B" }}
                onClick={_handleMenuClick}
              >
                <AccountCircleOutlinedIcon style={{ fontSize: "1.5em" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={_handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <div className="navbar__menu-items">
                  <Button onClick={_onHomeClick}>My Page</Button>
                  <Button onclick={_onAccountClick}>Account</Button>
                  <Button startIcon={<NightsStayIcon />}>Dark Mode</Button>
                  <Button onClick={handleLogout}>Sign out</Button>
                </div>
              </Menu>
            </div>
          ) : (
            <div className="navbar__buttons"></div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
