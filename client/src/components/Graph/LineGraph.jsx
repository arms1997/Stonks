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

export default function LineGraph(props) {
  const [hoverdNode, setHoveredNode] = useState(null);

  const { timestamps, yDomain, data } = props;

  const _onMouseLeave = () => setHoveredNode(null);

  const _tickFormatter = (index) => {
    return moment(props.timestamps[index]).format("MM-DD");
  };

  const _onNearestX = (value) => setHoveredNode({ ...value });

  return (
    <div>
      <FlexibleWidthXYPlot
        height={500}
        onMouseLeave={_onMouseLeave}
        yDomain={props.yDomain}
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
          ></Hint>
        )}
      </FlexibleWidthXYPlot>
    </div>
  );
}
