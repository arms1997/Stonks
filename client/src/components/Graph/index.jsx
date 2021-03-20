import { useEffect, useState } from "react";
import axios from "axios";
import LineGraphNews from "./LineGraphNews";
import { useLoading, Audio } from "@agney/react-loading";

export default function Graph({
  company,
  symbol,
  showNews = false,
  height,
  small = false,
}) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [company, symbol, showNews]);

  return (
    <div>
      <section {...containerProps}>{indicatorEl}</section>
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
