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
import { IconButton } from "@material-ui/core";
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

  const rows = [];

  const handleDeleteClick = (watchId) => {
    const index = currentUser.watches.findIndex(
      (watch) => watch.id === watchId
    );

    removeWatch(watchId, index)
      .then(() => console.log("deleted"))
      .catch((err) => console.error(err));
  };

  currentUser.watches.map((watch) => {
    if (watch.is_active) {
      rows.push(createData(watch.id, watch.ticker, watch.value));
    }
  });

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
