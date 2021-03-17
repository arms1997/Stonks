import { useEffect, useState } from "react";
import axios from "axios";
import LineGraph from "./LineGraph";
import LineGraphNews from "./LineGraphNews";

export default function Graph(props) {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const request = props.company
      ? axios.get(
          `/api/tickers/graph?company=${props.company}&symbol=${props.symbol}`
        )
      : axios.get(`/api/tickers/${props.symbol}`);

    request
      .then((data) => setGraphData(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {props.company
        ? graphData && <LineGraphNews data={graphData} />
        : graphData && <LineGraph data={graphData} />}
    </div>
  );
}
