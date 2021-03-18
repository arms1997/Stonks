import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";

import axios from "axios";
import { useEffect, useState } from "react";

import "./Navbar.scss";
import { useHistory } from "react-router-dom";

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
  const [options, setOptions] = useState();

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

  return (
    <div>
      {loading && (
        <AppBar
          position={"fixed"}
          color={"transparent"}
          className={classes.root}
        >
          <Toolbar className={classes.toolbar}>
            <img
              src="./images/stonks.svg"
              className={"navbar__image"}
              onClick={() => history.push("/")}
            />
            <Autocomplete
              className={classes.search}
              renderOption={(option) => {
                return (
                  <div className={"navbar__autocomplete-option"}>
                    <p className={"navbar__autocomplete-option-p"}>
                      {option.symbol.toUpperCase()}
                    </p>
                    <p className={"navbar__autocomplete-option-p"}>
                      {option.shortName}
                    </p>
                  </div>
                );
              }}
              loading={}
              options={options}
              getOptionLabel={(option) =>
                `${option.symbol.toUpperCase()} ${option.shortName} `
              }
              groupBy={(option) => "Symbol"}
              renderInput={(params) => (
                <TextField
                  className={classes.text}
                  {...params}
                  label="Search Stock"
                  variant="outlined"
                  margin="dense"
                />
              )}
            />
            <p></p>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
