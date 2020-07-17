import React, { useEffect, useRef } from "react";

import { useResizeObserver } from "@utils/useResizeObserver";

import drawPieChart from "./drawPieChart";

import "./styles.css";

export const PieChart = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions || Object.keys(data).length === 0) return;

    drawPieChart(svgRef, dimensions, data);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg className="pie-chart" ref={svgRef}></svg>
    </div>
  );
};
