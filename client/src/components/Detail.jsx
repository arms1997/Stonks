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
    padding: 32,
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

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.header}>
        <Typography className={classes.text} variant="h6">
          About
        </Typography>
        <IconButton onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} unmountOnExit>
        <CardContent className={classes.details}>
          <Typography variant="body1">Name: {companyData.name}</Typography>
          <Typography variant="body1">Symbol: {companyData.symbol}</Typography>
          <Typography variant="body1">
            Country: {companyData.country}
          </Typography>
          <Typography variant="body1">
            <strong>Currency:</strong> {companyData.currency}
          </Typography>
          <Typography variant="body1">
            Exchange: {companyData.exchange}
          </Typography>
          <Typography variant="body1">
            Description: {companyData.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
