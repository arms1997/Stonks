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

export default function LineGraph(props) {
  const [hoverdNode, setHoveredNode] = useState(null);

  const _onMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div>
      <FlexibleWidthXYPlot
        height={500}
        onMouseLeave={_onMouseLeave}
        yDomain={props.yDomain}
      ></FlexibleWidthXYPlot>
    </div>
  );
}
