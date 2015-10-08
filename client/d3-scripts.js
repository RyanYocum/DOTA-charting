

// console.log(data);

var data = [1,4,7,17,24,35];

// var body = d3.select('body');
// var chart = body.append('div');
// chart.classed("chart", true);
// var bar = chart.selectAll('div');
// var barUpdate = bar.data(data);
// var barEnter = barUpdate.enter().append('div');
// barEnter.style('width', function(d) {return d * 10 + "px"});
// barEnter.text(function(d) {return d});



var data1 = $.ajax({
    url: "http://novlovplov.xyz/api/accounts/",
    datatype: "json",
    success: function(){
      var data2 = data1.responseJSON;
      console.log(data2)
      data = [];
      for (var i = 0; i < data2.length; i++) {
        data.push(data2[i].currentMMR)
      }
      var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 800]);
      console.log(data)
      d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
    }
});