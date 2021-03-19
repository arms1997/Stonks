import { useEffect, useState } from "react";
import axios from "axios";
import LineGraphNews from "./LineGraphNews";

export default function Graph({ company, symbol, showNews = false }) {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const requestString = showNews
      ? `/api/tickers/graph?company=${company}&symbol=${symbol}`
      : `/api/tickers/${symbol}`;

    axios
      .get(requestString)
      .then((data) => setGraphData(data.data))
      .catch((err) => console.error(err));
  }, [company, symbol, showNews]);

  return (
    <div>
      {graphData && <LineGraphNews graphData={graphData} showNews={showNews} />}
    </div>
  );
}
