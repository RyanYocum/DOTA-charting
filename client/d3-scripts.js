var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var data1 = $.ajax({
    url: "http://novlovplov.xyz/api/accounts/",
    datatype: "json",
    success: function(){
      var data2 = data1.responseJSON;
      data = [];
      names = []
      for (var i = 0; i < data2.length; i++) {
        data.push(data2[i].currentMMR)
        names.push(data2[i].username)
      }

      console.log(data)
      console.log(names)

      x.domain(names.map(function(d) { return d; }));
      y.domain([0, d3.max(data, function(d) { return d; })]);

      var barWidth = width / data.length;

      var bar = chart.selectAll("g")
          .data(data)
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
          .attr("y", function(d) { return y(d); })
          .attr("height", function(d) { return height - y(d); })
          .attr("width", barWidth - 1);

      bar.append("text")
          .attr("x", x.rangeBand() / 2)
          .attr("y", function(d) { return y(d) + 3; })
          .attr("dy", ".75em")
          .text(function(d) { return d; });
    }
});

function type(d) {
  d = +d; // coerce to number
  return d;
}