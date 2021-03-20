import React, { useState } from "react";

import NewsList from "../News/NewsList";
import WatchTable from "./WatchTable";
import Graph from "../Graph/index";
import "./UserLanding.scss";
import { Card } from "@material-ui/core";

import { useAuth } from "../../contexts/AuthContext";

export default function UserLanding() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  //get user's liked tickers for graph display
  const [loading, setLoading] = useState(true);

  const likedTickers = [...currentUser.likes];

  const parsedGraphs = likedTickers.map((graph) => {
    return (
      <Graph
        symbol={graph.ticker}
        company={null}
        showNews={false}
        loading={loading}
        setLoading={setLoading}
        height={200}
      />
    );
  });

  console.log(parsedGraphs);

  return (
    <div className="userLanding">
      <h1>Hello {currentUser.username}</h1>
      <header className="userLanding__header">
        <h2>Liked Stocks</h2>
        <h2>Current Watches</h2>
      </header>
      <section className="userLanding__section-top">
        <Card className="userLanding__section-top-graph">{parsedGraphs}</Card>
        <WatchTable className="userLanding__section-top-watchTable" />
      </section>
      <section className="userLanding___section-bottom">
        <NewsList company="null" symbol="null" showAllNews={true} />
      </section>
    </div>
  );
}
