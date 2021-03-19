import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { Checkbox, IconButton, Switch } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function WatchTable({ userWatches, userId }) {
  const classes = useStyles();

  console.log(userId);

  const rows = [];

  const handleDelete = () => {
    console.log("delete");
  };

  userWatches.map((watch) => {
    rows.push(createData(watch.id, watch.ticker, watch.value));
  });

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ticker</TableCell>
            <TableCell align="center">Watch Price ($)</TableCell>
            <TableCell align="center">Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.ticker}</TableCell>
              <TableCell align="center">{row.watchPrice}</TableCell>
              <TableCell align="center">
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
