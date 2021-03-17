import { useState } from "react";
import {
  FlexibleWidthXYPlot,
  AreaSeries,
  LineSeries,
  Hint,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";
import moment from "moment";

import DataBubble from "../Bubbles/DataBubble";

export default function LineGraph(props) {
  const [hoverdNode, setHoveredNode] = useState(null);

  const { ticker, timestamps, yDomain, data } = props;

  const _onMouseLeave = () => setHoveredNode(null);

  const _tickFormatter = (index) => {
    return moment(timestamps[index]).format("MM-DD");
  };

  const _onNearestX = (value) => setHoveredNode({ ...value });

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
        {hoverdNode && <MarkSeries data={hoverdNode} />}
        {hoverdNode && (
          <Hint
            value={hoverdNode}
            align={{ horizontal: "leftEdge", vertical: "topEdge" }}
            style={{ marginLeft: "80px", marginTop: "30px" }}
          >
            <DataBubble ticker={ticker} value={hoverdNode.y} />
          </Hint>
        )}
        {hoverdNode && (
          <Hint
            value={hoverdNode}
            align={{ vertical: "bottomEdge", horizontal: "auto" }}
            style={{ marginTop: "30px" }}
          >
            <DataBubble value={timestamp[hoverdNode.x]} timestamp />
          </Hint>
        )}
      </FlexibleWidthXYPlot>
    </div>
  );
}
