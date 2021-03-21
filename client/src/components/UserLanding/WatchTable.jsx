import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles({
  container: {
    maxWidth: 300,
    maxHeight: 300,
    minHeight: 300,
  },

  table: {
    maxWidth: 500,
  },
});

function createData(id, ticker, watchPrice) {
  return { id, ticker, watchPrice };
}

export default function WatchTable() {
  const { currentUser, removeWatch } = useAuth();
  const classes = useStyles();

  const handleDeleteClick = (watchId) => {
    const index = currentUser.watches.findIndex(
      (watch) => watch.id === watchId
    );

    removeWatch(watchId, index)
      .then(() => console.log("deleted"))
      .catch((err) => console.error(err));
  };

  const rows = currentUser.watches
    .filter((watch) => watch.is_active)
    .map((watch) => createData(watch.id, watch.ticker, watch.value));

  console.log("rows", rows);

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ticker</TableCell>
            <TableCell align="center">Watch Price ($)</TableCell>
            <TableCell align="center">Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows.length && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>You have no watched stocks!</TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.ticker}</TableCell>
              <TableCell align="center">{row.watchPrice}</TableCell>
              <TableCell align="center">
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDeleteClick(row.id);
                    }}
                  >
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
