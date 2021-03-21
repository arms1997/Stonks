import { useEffect, useState } from "react";
import axios from "axios";
import LineGraphNews from "./LineGraphNews";
import { useLoading, Audio } from "@agney/react-loading";
import NewsContainer from "./NewsContainer";

export default function Graph({
  company,
  symbol,
  showNews = false,
  height,
  small = false,
}) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relevantNews, setRelevantNews] = useState();

  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Audio width="100" />,
  });

  useEffect(() => {
    setLoading(true);
    const requestString = showNews
      ? `/api/tickers/graph?company=${company}&symbol=${symbol}`
      : `/api/tickers/${symbol}`;

    axios
      .get(requestString)
      .then((data) => {
        setGraphData(data.data);
        setRelevantNews(data.data.relevantNews);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [company, symbol, showNews]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <section {...containerProps}>{indicatorEl}</section>
      {!loading && graphData && (
        <>
          <LineGraphNews
            graphData={graphData}
            showNews={showNews}
            height={height}
            small={small}
            setRelevantNews={setRelevantNews}
          />
          {showNews && <NewsContainer relevantNews={relevantNews} />}
        </>
      )}
    </div>
  );
}
