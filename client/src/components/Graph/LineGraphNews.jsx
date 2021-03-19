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

import DataBubble from "../Bubbles/DataBubble";
import NewsBubble from "../Bubbles/NewsBubble";

export default function LineGraphNews({ graphData, showNews = false }) {
  const [hoverdNode, setHoveredNode] = useState(null);
  const [areaHover, setAreaHover] = useState({});
  const [hintInfo, setHintInfo] = useState({});
  const [hover, setHover] = useState(false);

  const {
    title,
    timestamps,
    yDomain,
    data,
    areaData = null,
    hintData = null,
  } = graphData;

  const _onMouseLeave = () => setHoveredNode(null);

  const _tickFormatter = (index) => {
    return moment(timestamps[index]).format("MM-DD");
  };

  const _onNearestX = (value) => setHoveredNode({ ...value });

  const areaSeries =
    showNews &&
    areaData.map((data, index) => {
      return (
        <AreaSeries
          key={index}
          data={data}
          opacity={areaHover[index] ? 0.8 : 0.4}
          color="#b4cbf0"
          onSeriesMouseOver={() => {
            setHover(true);
            setHintInfo(hintData[index]);
            setAreaHover((prev) => ({ ...prev, [index]: true }));
          }}
          onSeriesMouseOut={() => {
            setHover(false);
            setAreaHover((prev) => ({ ...prev, [index]: false }));
          }}
        />
      );
    });

  return (
    <div>
      <FlexibleWidthXYPlot
        height={500}
        onMouseLeave={_onMouseLeave}
        yDomain={yDomain}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={_tickFormatter} />
        <YAxis />
        <LineSeries data={data} onNearestX={_onNearestX} animation />
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
        {showNews && hover && (
          <Hint value={hintInfo.data} style={{ marginBottom: "10px" }}>
            <NewsBubble title={hintInfo.hint.title} />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
    </div>
  );
}
