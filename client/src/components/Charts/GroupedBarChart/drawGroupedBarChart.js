import {
  select,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  axisBottom,
  max,
  axisRight,
} from "d3";
import { TAG_MAP } from "../../../utils/constants";

const drawGroupedBarChart = (svgRef, { width, height }, data) => {
  const chartWidth = width,
    barPadding = 0.3;
  const axisTicks = { qty: 5, outerSize: 0, dateFormat: "%m-%d" };
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const svg = select(svgRef.current);

  let chartHeight = 350;

  svg.attr("width", chartWidth).attr("height", chartHeight);

  const color = scaleOrdinal()
    .domain(["expense", "budget"])
    .range(["blue", "red"]);

  const xScale0 = scaleBand()
    .domain(data.map((d) => TAG_MAP[d.tag].text))
    .range([0, width - margin.left - margin.right])
    .padding(barPadding);

  const xScale1 = scaleBand()
    .domain(["expense", "budget"])
    .range([0, xScale0.bandwidth()]);

  // console.log(xScale1.bandwidth());

  const yScale = scaleLinear().range([
    chartHeight - margin.top - margin.bottom,
    40,
  ]);

  const xAxis = axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);

  const yAxis = axisRight(yScale)
    .ticks(axisTicks.qty)
    .tickSizeOuter(axisTicks.outerSize);

  yScale.domain([
    0,
    max(data, (d) => (d.expense > d.budget ? d.expense : d.budget)),
  ]);

  svg.selectAll("rect").remove();

  const legend = svg.selectAll(".legend").data(["expense", "budget"]).enter();

  svg.selectAll("text.legend-text").remove();

  legend
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("x", (d) => (d === "expense" ? 10 + width / 3 : 105 + width / 3))
    .attr("y", 8)
    .style("fill", (d) => color(d));

  legend
    .append("text")
    .attr("class", "legend-text")
    .text((d) => `${d[0].toUpperCase()}${d.slice(1)}`)
    .attr("x", (d) => (d === "expense" ? 30 + width / 3 : 125 + width / 3))
    .attr("y", 20)
    .exit()
    .remove();

  const tag = svg
    .selectAll(".tag")
    .data(data)
    .join("g")
    .attr("class", "tag")
    .attr("transform", (d) => `translate(${xScale0(TAG_MAP[d.tag].text)},0)`);

  tag
    .selectAll(".bar.expense")
    .data((d) => [d])
    .join("rect")
    .attr("class", "bar-expense")
    .style("fill", color("expense"))
    .attr("x", (d) => {
      return xScale1("expense");
    })
    .attr("y", (d) => yScale(d.expense))
    .attr("width", xScale1.bandwidth())
    .attr(
      "height",
      (d) => chartHeight - margin.top - margin.bottom - yScale(d.expense)
    );

  tag
    .selectAll(".bar.budget")
    .data((d) => [d])
    .join("rect")
    .attr("class", "bar-budget")
    .style("fill", color("budget"))
    .attr("x", (d) => xScale1("budget"))
    .attr("y", (d) => yScale(d.budget))
    .attr("width", xScale1.bandwidth())
    .attr(
      "height",
      (d) => chartHeight - margin.top - margin.bottom - yScale(d.budget)
    );

  svg
    .select(".x-axis")
    .style("transform", `translateY(${height - 20}px)`)
    .call(xAxis);

  svg.select(".y-axis").call(yAxis);
};

export default drawGroupedBarChart;
