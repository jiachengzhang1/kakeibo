import React, { useEffect, useRef } from "react";

import { useResizeObserver } from "@utils/useResizeObserver";
import drawGroupedBarChart from "./drawGroupedBarChart";

import "./styles.css";

export const GroupedBarChart = ({ data }) => {
  // console.log(data);
  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  //   console.log(dimensions);

  useEffect(() => {
    if (!dimensions || Object.keys(data).length === 0) return;
    drawGroupedBarChart(svgRef, dimensions, data);
    // console.log(dimensions);
  }, [data, dimensions]);

  //   drawGroupedBarChart(svgRef);

  return (
    <div ref={wrapperRef}>
      <svg className="grouped-bar-chart" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};
