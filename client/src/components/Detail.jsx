import axios from "axios";
import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  text: {
    padding: 12,
  },
  details: {
    padding: "0px 32px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: "20px",
    width: "100%",
  },
  detailRow: {
    maxWidth: "40%",
  },
});

export default function Detail({ symbol }) {
  const classes = useStyles();
  const [companyData, setCompanyData] = useState({});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/tickers/company/${symbol}`)
      .then((data) => setCompanyData(data.data))
      .catch((error) => console.error(error));
  }, [symbol]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const companyDataKeys = Object.keys(companyData);

  const detailsInfo = companyDataKeys.map((key) => {
    if (key === "name") {
      return;
    }

    return (
      <>
        <hr></hr>
        <div className={classes.row}>
          <Typography variant="inherit">{key.toUpperCase()}</Typography>
          <Typography
            variant="inherit"
            align="right"
            className={classes.detailRow}
          >
            {companyData[key]}
          </Typography>
        </div>
      </>
    );
  });

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.header}>
        <Typography className={classes.text} variant="h6">
          {companyData.name}
        </Typography>
        <IconButton onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded}>
        <CardContent className={classes.details}>{detailsInfo}</CardContent>
      </Collapse>
    </Card>
  );
}
