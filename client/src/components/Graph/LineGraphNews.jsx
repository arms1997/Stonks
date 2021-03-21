import { useState } from "react";
import {
  FlexibleWidthXYPlot,
  LineSeries,
  Hint,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  AreaSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import moment from "moment";
import LockIcon from "@material-ui/icons/Lock";
import DataBubble from "../Bubbles/DataBubble";

import "./Graph.scss";

export default function LineGraphNews({
  graphData,
  showNews = false,
  height,
  small = false,
  setRelevantNews,
}) {
  const [hoverdNode, setHoveredNode] = useState(null);
  const [areaHover, setAreaHover] = useState({});
  const [hintLocation, setHintLocation] = useState();
  const [lock, setLock] = useState({ lock: false, index: null });

  const {
    title,
    timestamps,
    yDomain,
    data,
    areaData = null,
    relevantNews,
    hintData,
  } = graphData;

  const _onMouseLeave = () => setHoveredNode(null);

  const _tickFormatter = (index) => {
    return moment(timestamps[index]).format("MM-DD");
  };

  const _onNearestX = (value) => setHoveredNode({ ...value });

  const graphClass = small ? `graph__item-title-small` : "graph__item-title";

  const keys = showNews ? Object.keys(relevantNews) : null;

  const areaSeries =
    showNews &&
    areaData.map((data, index) => {
      return (
        <AreaSeries
          style={{ cursor: "pointer" }}
          key={index}
          data={data}
          opacity={areaHover[index] ? 1 : 0.4}
          color="#b4cbf0"
          onSeriesMouseOver={() => {
            if (!lock.lock) {
              setRelevantNews(relevantNews[keys[index]]);
              setAreaHover((prev) => ({ ...prev, [index]: true }));
            }
          }}
          onSeriesClick={() => {
            if (!lock.lock) {
              setHintLocation(hintData[index].data);
              setLock({ lock: !lock.lock, index: index });
            } else if (index === lock.index) {
              setHintLocation(null);
              setLock({ lock: !lock.lock, index: null });
            }
          }}
          onSeriesMouseOut={() => {
            if (!lock.lock) {
              setAreaHover((prev) => ({ ...prev, [index]: false }));
              setRelevantNews(relevantNews);
            }
          }}
        />
      );
    });

  return (
    <div className="graph__item">
      <h1 className={graphClass}>{title.toUpperCase()}</h1>
      <h3 className="graph__item-price">${data[0]["y"]}</h3>
      <FlexibleWidthXYPlot
        onMouseLeave={_onMouseLeave}
        yDomain={yDomain}
        height={height}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={_tickFormatter} />
        <YAxis />
        <LineSeries
          data={data}
          onNearestX={_onNearestX}
          animation
          color="#849e95"
        />
        {hoverdNode && <MarkSeries data={[hoverdNode]} />}
        {hoverdNode && (
          <Hint
            value={hoverdNode}
            align={{ horizontal: "leftEdge", vertical: "topEdge" }}
            style={{ marginLeft: "80px", marginTop: "30px" }}
          >
            <DataBubble ticker={title.toUpperCase()} value={hoverdNode.y} />
          </Hint>
        )}
        {hoverdNode && (
          <Hint
            value={hoverdNode}
            align={{ vertical: "bottomEdge", horizontal: "auto" }}
            style={{ marginTop: "30px" }}
          >
            <DataBubble value={timestamps[hoverdNode.x]} timestamp />
          </Hint>
        )}
        {showNews && areaSeries}
        {showNews && lock.lock && (
          <Hint value={hintLocation} style={{ marginBottom: "10px" }}>
            <LockIcon style={{ color: "#ffb449" }} fontSize="medium" />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
    </div>
  );
}
