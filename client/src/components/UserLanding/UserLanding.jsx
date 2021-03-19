import React, { useState } from "react";

import NewsList from "../News/NewsList";
import WatchTable from "./WatchTable";
import Graph from "../Graph/index";
import "./UserLanding.scss";

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
      />
    );
  });

  console.log(parsedGraphs);

  return (
    <div className="userLanding">
      <header className>
        <h1>Hello {currentUser.username}</h1>
        <h2>Current Watches</h2>
      </header>
      <section>
        <WatchTable className="userLanding__watchTable" />
        {parsedGraphs}
      </section>
      <h2>News</h2>
      <NewsList company="null" symbol="null" showAllNews={true} />
    </div>
  );
}
