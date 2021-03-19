import Detail from "./Detail";
import Graph from "./Graph";
import NewsList from "./News/NewsList";

import "./Ticker.scss";

export default function Ticker({ symbol, company }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="ticker">
      <Graph
        symbol={symbol}
        company={company}
        showNews={true}
        setLoading={setLoading}
      />
      <div className="ticker__bottom">
        <NewsList symbol={symbol} company={company} />
        <div className="ticker__bottom-detail">
          <Detail symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
