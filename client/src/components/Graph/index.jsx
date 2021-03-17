import { useEffect, useState } from "react";
import axios from "axios";
import LineGraph from "./LineGraph";
import LineGraphNews from "./LineGraphNews";

export default function Graph({ company, symbol, showNews = false }) {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const request = showNews
      ? axios.get(`/api/tickers/graph?company=${company}&symbol=${symbol}`)
      : axios.get(`/api/tickers/${symbol}`);

    request
      .then((data) => setGraphData(data.data))
      .catch((err) => console.error(err));
  }, [company, symbol, showNews]);

  return (
    <div>
      {showNews
        ? graphData && <LineGraphNews data={graphData} />
        : graphData && <LineGraph data={graphData} />}
    </div>
  );
}
