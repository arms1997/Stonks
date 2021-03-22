import React, { useState } from "react";

import NewsList from "../News/NewsList";
import WatchTable from "./WatchTable";
import Graph from "../Graph/index";
import PreviousTicker from "./PreviousTickers";
import "./UserLanding.scss";
import {
  Card,
  CardContent,
  CardActionArea,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  Avatar,
  makeStyles,
} from "@material-ui/core";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#849e95",
  },

  large: {
    width: 100,
    height: 100,
    backgroundColor: "#7ca5ce",
    alignSelf: "center",
  },
}));

export default function UserLanding() {
  const classes = useStyles();
  const { currentUser, updatePreviousTickers } = useAuth();
  const history = useHistory();

  //get user's liked tickers for graph display
  const [loading, setLoading] = useState(true);

  let likedTickers = [...currentUser.likes].filter(
    (ticker) => ticker.is_active
  );

  const handleGraphClick = ({ ticker, company }) => {
    updatePreviousTickers(ticker, company);
    history.push(`/ticker/${ticker}/${company}`);
  };

  const parsedGraphs = likedTickers.map((graph) => {
    return (
      <TableRow>
        <TableCell>
          <CardActionArea onClick={() => handleGraphClick(graph)}>
            <Card className="userLanding__section-top-graph">
              <Graph
                symbol={graph.ticker}
                company={graph.company}
                showNews={false}
                loading={loading}
                setLoading={setLoading}
                height={200}
                small={true}
              />
            </Card>
          </CardActionArea>
        </TableCell>
      </TableRow>
    );
  });

  console.log(parsedGraphs);

  return (
    <div className="userLanding">
      <Avatar src="/broken-image.jpg" className={classes.large} />
      <h1>Hello {currentUser.username}</h1>
      <header className="userLanding__header">
        <Card className="userLanding__header-likesTitle">
          <CardContent style={{ backgroundColor: "#849e95", color: "white" }}>
            Liked Stocks
          </CardContent>
        </Card>
        <Card className="userLanding__header-watchesTitle">
          <CardContent style={{ backgroundColor: "#8b9eaa", color: "white" }}>
            Watched Stocks
          </CardContent>
        </Card>
      </header>
      <section className="userLanding__section-top">
        <TableContainer>
          <Table>
            <TableRow>
              {!parsedGraphs.length && (
                <div style={{ marginRight: "60px", fontSize: "30px" }}>
                  You have no liked stocks!
                </div>
              )}
              <TableBody>{parsedGraphs}</TableBody>
            </TableRow>
          </Table>
        </TableContainer>
        <div className="userLanding__section-top-rightSide">
          <div className="userLanding__section-top-watchTable">
            {currentUser.watches && <WatchTable />}
          </div>
          <div>
            <PreviousTicker />
          </div>
        </div>
      </section>
      <section className="userLanding__section-bottom">
        <Card className="userLanding__section-bottom-newsTitle">
          <CardContent style={{ backgroundColor: "#825c79", color: "white" }}>
            Today's News
          </CardContent>
        </Card>
        <NewsList company="null" symbol="null" showAllNews={true} />
      </section>
    </div>
  );
}
