d3.csv("/data/libraries.csv").then((data) => {
  const div = d3.select("body");
  const width = window.innerWidth;
  const height = Math.min(width, height);
  const colorScale = d3.scaleOrdinal([
    "#7326AB",
    "#2A59A9",
    "#E5A1D4",
    "#00A0B0",
    "#1C9FE9",
  ]);

  const svg = div
    .append("svg")
    .attr("width", width)
    .attr("height")
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
});
