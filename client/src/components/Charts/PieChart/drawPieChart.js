import { select, arc, pie, entries, scaleOrdinal } from "d3";

const getTotalSpending = (data) => {
  let totalSpending = 0;
  Object.keys(data).forEach((key) => {
    totalSpending += parseFloat(data[key]);
  });
  return totalSpending;
};

const tagMap = {
  living: "Expenses on Living",
  culture: "Culture and Education",
  entertainment: "Entertainment",
  others: "Others",
};

const color = scaleOrdinal()
  .domain(["living", "culture", "entertainment", "others"])
  .range(["blue", "green", "orange", "cyan"]);

const drawCenterText = (svg, width, height, radius, totalSpending) => {
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.1em")
    .style("font-size", radius / 9)
    .attr("font-weight", 600)
    .text("Total Spending")
    .attr("transform", `translate(${(width * 1) / 2.5}, ${height / 2})`);

  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1.5em")
    .style("font-size", radius / 9)
    .attr("font-weight", 600)
    .text(`$${totalSpending.toFixed(2)}`)
    .attr("transform", `translate(${(width * 1) / 2.5}, ${height / 2})`);
};

const drawLegend = (svg, data_ready, width, height, radius, totalSpending) => {
  const legendG = svg.selectAll(".legend").data(data_ready).enter().append("g");

  // console.log(width);
  if (width >= 674) {
    legendG.attr("transform", function (d, i) {
      return `translate(${width / 2.5 + 180}, ${height / 2 - 78 - i * 25})`;
    });
  } else {
    legendG.attr("transform", function (d, i) {
      let x = width / 2.5,
        y = height - 40;
      switch (i) {
        case 0:
          x = width > 480 ? x + 100 : x + 40;
          break;
        case 1:
          x = width > 480 ? x - 100 : x - 120;
          break;
        case 2:
          x = width > 480 ? x + 100 : x + 40;
          y = y - 20;
          break;
        default:
          x = width > 480 ? x - 100 : x - 120;
          y = y - 20;
          break;
      }
      return `translate(${x}, ${y})`;
    });
  }

  legendG
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", function (d) {
      return color(d.data.key);
    });

  legendG
    .append("text")
    .attr("font-weight", 600)
    .text(function (d) {
      const percentage = ((d.data.value / totalSpending) * 100).toFixed(0);
      const text = ` ${percentage}% ${tagMap[d.data.key]}`;
      return text;
    })
    .style("font-size", radius / 14)
    .attr("y", 16)
    .attr("x", 25);
};

const drawPieChart = (svgRef, { width, height }, data) => {
  const margin = 0;

  const svg = select(svgRef.current);
  console.log(width);
  const radius = 125 - margin;
  // const radius = Math.min(width, height) / 2 - margin;

  const arcGenerator = arc()
    .innerRadius(radius * 0.4)
    .outerRadius(radius * 0.8);

  const pieGenerator = pie().value((d) => d.value);
  const data_ready = pieGenerator(entries(data).reverse());

  svg
    .selectAll(".slice")
    .data(data_ready)
    .join("path")
    .attr("class", "slice")
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "1px")
    .attr("transform", `translate(${(width * 1) / 2.5}, ${height / 2})`)
    .attr("d", arcGenerator);

  svg.selectAll("text").remove();
  svg.selectAll("g").remove();

  const totalSpending = getTotalSpending(data);

  drawCenterText(svg, width, height, radius, totalSpending);
  drawLegend(svg, data_ready, width, height, radius, totalSpending);
};

export default drawPieChart;
