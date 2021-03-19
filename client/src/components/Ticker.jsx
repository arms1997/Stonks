import { useState } from "react";
import { useLoading, Audio } from "@agney/react-loading";

import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";

export default function Ticker({ symbol, company }) {
  const [loading, setLoading] = useState(true);

  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Audio width="100" />,
  });

  return (
    <div className="ticker">
      <section {...containerProps}>{indicatorEl}</section>
      <Graph
        symbol={symbol}
        company={company}
        showNews={true}
        loading={loading}
        setLoading={setLoading}
      />
      {!loading && (
        <div className="ticker__bottom">
          <NewsList symbol={symbol} company={company} />
          <div className="ticker__bottom-detail">
            <Detail symbol={symbol} />
          </div>
        </div>
      )}
    </div>
  );
}
