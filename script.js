//D3 resources: https://www.youtube.com/watch?v=znBBk_M95QY
//https://www.youtube.com/watch?v=11QMX7vA22Y&t=785s
//timeParse resources: https://github.com/d3/d3-time#_interval
//https://stackoverflow.com/questions/32428122/what-scale-to-use-for-representing-years-only-on-x-axis-in-d3-js

document.addEventListener('DOMContentLoaded', function () {
  req = new XMLHttpRequest();
  req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
  req.send();
  req.onload = function () {
    json = JSON.parse(req.responseText);
    var dataset = json.data;

    console.log(dataset);

    const w = 500;
    const h = 500;
    const padding = 100; //padding
    var parseDate = d3.timeParse("%Y-%m-%d");

    const xScale = d3.scaleTime().rangeRound([0, w]);

    const yScale = d3.scaleLinear().range([h, 0]);

    xScale.domain(d3.extent(dataset, d => parseDate(d[0])));
    yScale.domain([0, d3.max(dataset, d => d[1])]);


    const svg = d3.select("a").
    append("svg").
    attr("width", w).
    attr("height", h);

    //Add the rectangles (bars)
    svg.
    selectAll("bar").
    data(dataset).
    enter().
    append("rect").
    attr("x", d => xScale(parseDate(d[0]))).
    attr("width", 1 + 1).
    attr("y", d => yScale(d[1])).
    attr("height", d => h - yScale(d[1])).
    attr("data-date", d => d[0]).
    attr("data-gdp", d => d[1]).
    attr("class", "bar");




    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    //--> X Axis
    svg.
    append("g").
    attr("id", "x-axis").
    attr("class", "axis").
    attr("transform", `translate(0, ${h})`).
    call(xAxis.ticks(null).tickSize(10, 10, 0));

    svg.
    append("g").
    attr("id", "y-axis").
    attr("class", "axis").
    call(yAxis.ticks(null).tickSize(10, 10, 0));

    var ticks = d3.selectAll("g.tick");
    ticks.attr("class", "tick");
    ticks.attr("color", "red");


    var tooltip = d3.select(".graph").
    append("div").
    style("position", "absolute").
    style("visibility", "hidden").
    text("I'm a circle!");

    //
    d3.select("bar").
    on("mouseover", function () {
      console.log("ciaooo");
      return tooltip.style("visibility", "visible");}).
    on("mouseout", function () {return tooltip.style("visibility", "hidden");});
  };

});