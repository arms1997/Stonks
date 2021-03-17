import { AppBar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Navbar(props) {
  return (
    <AppBar position={"fixed"}>
      <p>Hello</p>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />
    </AppBar>
  );
}
