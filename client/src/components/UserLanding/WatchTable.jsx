import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ToolTip, Checkbox, IconButton, Switch } from "@material-ui/core";
import { DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    marginTop: 100,
    maxWidth: 500,
  },

  table: {
    maxWidth: 500,
  },
});

function createData(id, ticker, watchPrice) {
  return { id, ticker, watchPrice };
}

export default function WatchTable({ userWatches }) {
  const classes = useStyles();

  console.log(userWatches);

  const rows = [];

  userWatches.map((watch) => {
    rows.push(createData(watch.id, watch.ticker, watch.value));
  });

  console.log(rows);
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker ID</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Watch Price ($)</TableCell>
            <TableCell align="right">Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.ticker}</TableCell>
              <TableCell align="right">{row.watchPrice}</TableCell>
              <TableCell align="right">
                <Checkbox />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
