var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// var data1 = $.ajax({
//     url: "http://novlovplov.xyz/api/accounts/",
//     datatype: "json",
//     success: function(){
//       var data2 = data1.responseJSON;
//       data = [];
      
//       for (var i = 0; i < data2.length; i++) {
//         data.push({current: data2[i].currentMMR, name: data2[i].username, original: data2[i].startingMMR});
//       }

d3.json('http://novlovplov.xyz/api/accounts/', function (error, data) {
  var MMRs = d3.keys(["startingMMR", "currentMMR"]);
       x0.domain(data.map(function(d) { return d.name; }));
       x1.domain(MMRs).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d.current; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("current");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x0", function(d) { return x0(d.name); })
      .attr("width", x0.rangeBand())
      .attr("y", function(d) { return y(d.currentMMR); })
      .attr("height", function(d) { return height - y(d.function); });
//     }
});

currentMMR type(d) {
  d.current = +d.current; // coerce to number
  return d;
}
