import { useEffect, useState } from "react";
import axios from "axios";
import LineGraphNews from "./LineGraphNews";

export default function Graph({
  company,
  symbol,
  showNews = false,
  loading,
  setLoading,
  height,
  small = false,
}) {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const requestString = showNews
      ? `/api/tickers/graph?company=${company}&symbol=${symbol}`
      : `/api/tickers/${symbol}`;

    axios
      .get(requestString)
      .then((data) => {
        setGraphData(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [company, symbol, showNews, setLoading]);

  return (
    <div>
      {!loading && graphData && (
        <LineGraphNews
          graphData={graphData}
          showNews={showNews}
          height={height}
          small={small}
        />
      )}
    </div>
  );
}
