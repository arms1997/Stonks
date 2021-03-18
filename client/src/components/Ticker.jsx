import Graph from "./Graph";
import NewsList from "./News/NewsList";

export default function Ticker({ symbol, company }) {
  return (
    <div>
      <Graph symbol={symbol} company={company} showNews={true} />
      <NewsList symbol={symbol} company={company} />
    </div>
  );
}
