import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";

import axios from "axios";
import { useEffect, useState } from "react";

import "./Navbar.scss";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  search: {
    flexGrow: 1,
  },
  text: {
    height: "10%",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

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

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root}>
      {!loading && (
        <AppBar position={"fixed"} color={"transparent"}>
          <Toolbar>
            <p className={classes.title}>Hello</p>
            <Autocomplete
              options={options}
              getOptionLabel={(option) =>
                `${option.shortName} ${option.symbol}`
              }
              groupBy={(option) => "Symbol"}
              className={classes.search}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Stock"
                  variant="outlined"
                />
              )}
            />
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
