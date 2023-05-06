// Set up the SVG canvas
const svg = d3
  .select(".chart_box")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 500);

// Load the data from the API
d3.json("https://data.princegeorgescountymd.gov/resource/7k64-tdwr.json")
  .then((data) => {
    // Group the data by zip code and count the number of libraries
    const zipCounts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.zip_code
    );
    console.log(zipCounts);
    // Convert the map to an array of objects
    const zipCountsArray = Array.from(zipCounts, ([zip_code, count]) => ({
      zip_code,
      count,
    }));

    // Sort the array by count in descending order
    zipCountsArray.sort((a, b) => b.count - a.count);

    // Set up the scales for the chart
    const xScale = d3
      .scaleBand()
      .domain(zipCountsArray.map((d) => d.zip_code))
      .range([50, 700])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(zipCountsArray, (d) => d.count) + 1])
      .range([550, 50]);

    // Add the x-axis to the chart

    svg
      .append("g")
      .attr("transform", "translate(0, 40)")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(90)")
      .attr("x", -3)
      .attr("y", -3)
      .style("text-anchor", "end");

    // Add the y-axis to the chart

    svg
      .append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft(yScale));

    // Add the bars to the chart
    svg
      .selectAll("rect")
      .data(zipCountsArray)
      .enter()
      .append("rect")
      .on("mouseover", onMouseOver) //bar animation
      .on("mouseout", onMouseOut) //bar animation
      .attr("x", (d) => xScale(d.zip_code))
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .transition() //added transition to bars
      .ease(d3.easeLinear)
      .duration(500)
      .delay(function (d, i) {
        return i * 50;
      })
      .attr("height", (d) => 500 - yScale(d.count))
      .attr("fill", "steelblue");

    /* Add the zip code labels to the chart
    svg
      .selectAll(".label")
      .data(zipCountsArray)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.zip_code) + xScale.bandwidth())
      .attr("y", 500)
      .attr("text-anchor", "middle")
      .text((d) => d.zip_code);
      */
  })
  .catch((error) => {
    console.log(error);
  });

//Mouseover even handler
function onMouseOver(d, i) {
  d3.select(this).attr("class", "highlight");
  d3.select(this)
    .transition()
    .duration(500)
    .attr("width", xScale.bandwidth() + 5)
    .attr("y", function (d) {
      return yScale(d.value) - 10;
    })
    .attr("height", function (d) {
      return height - yScale(d.value) + 10;
    });
}

//Mouseout event handler

function onMouseOut(d, i) {
  d3.select(this).attr("class", "");
  d3.select(this)
    .transition()
    .duration(500)
    .attr("width", xScale.bandwidth())
    .attr("y", function (d) {
      return yScale(d.value);
    })
    .attr("height", function (d) {
      return height - yScale(d.value);
    });
}
