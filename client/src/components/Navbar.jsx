import { AppBar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Toolbar from "@material-ui/core/Toolbar";

import axios from "axios";
import { useEffect, useState } from "react";

import "./Navbar.scss";

export default function Navbar(props) {
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
    <div className={"navbar"}>
      {!loading && (
        <AppBar position={"fixed"} color={"transparent"}>
          <Toolbar>
            <p>Hello</p>
            <Autocomplete
              options={options}
              getOptionLabel={(option) => {
                return `${option.shortName} ${option.symbol}`;
              }}
              groupBy={(option) => "Symbol"}
              className={"navbar__autocomplete"}
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
