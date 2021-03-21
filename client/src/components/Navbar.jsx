import {
  AppBar,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import axios from "axios";
import { useEffect, useState } from "react";

import "./Navbar.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 60,
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

export default function Navbar() {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState({ symbol: "", shortName: "" });
  const [inputValue, setInputValue] = useState("");

  const { currentUser, logout, updatePreviousTickers } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      // setError("Failed to log out");
    }
  }

  const _onHomeClick = () => {
    setValue({ symbol: "", shortName: "" });
    history.push("/mylanding");
  };

  const _onAccountClick = () => {
    setValue({ symbol: "", shortName: "" });
    history.push("/me");
  };

  const _onLoginClick = () => {
    setValue({ symbol: "", shortName: "" });

    history.push("/login");
  };

  const onChangeHandler = (event, value) => {
    if (!value) {
      return;
    }

    updatePreviousTickers(value.symbol, value.shortName);
    setValue({ ...value });
    history.push(`/ticker/${value.symbol}/${value.shortName}`);
  };

  const _handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const _handleClose = () => {
    setOpenMenu(false);
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

  const { pathname } = useLocation();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"
  ) {
    return null;
  }

  return (
    <div>
      <AppBar position={"fixed"} color="default" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <img
            src="./images/stonks.svg"
            className="navbar__image"
            alt="logo"
            onClick={_onHomeClick}
          />
          <Autocomplete
            className={classes.search}
            value={value}
            onChange={onChangeHandler}
            options={options}
            getOptionLabel={(option) =>
              `${option.symbol.toUpperCase()} ${option.shortName}`
            }
            renderOption={(option) => optionComponent(option)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
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
                open={openMenu}
                onClose={_handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <div>
                  <MenuItem onClick={_onHomeClick}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Page" />
                  </MenuItem>
                  <MenuItem onClick={_onAccountClick}>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                  </MenuItem>
                </div>
              </Menu>
            </div>
          ) : (
            <div className="navbar__buttons">
              <CustomButton onClick={_onLoginClick}>Login</CustomButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
