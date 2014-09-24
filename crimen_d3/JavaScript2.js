﻿
var h = 250;
var w = 550;
var padding = 20;


function buildLine(ds) {

    console.log('xscale-max: ' + d3.max(ds, function (d) { return d.exis; }));
    console.log('yscale-max: ' + d3.max(ds, function (d) { return d.yoyo; }));

    //scales
    var xScale = d3.scale.linear()
                .domain([
                            d3.min(ds, function (d) { return d.exis ;}),
                            d3.max(ds, function (d) { return d.exis ;})
                ])
                .range([padding+5, w-padding])
                .nice();

    var tooltip = d3.select("#chart").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);



    var yScale = d3.scale.linear()
                .domain([0, d3.max(ds, function (d) { return d.yoyo; })])
                .range([h - padding, 10])
                .nice();
   
    var xAxisGen = d3.svg.axis().scale(xScale).orient("bottom").ticks(7);
    var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);


    var lineFun = d3.svg.line()
        .x(function (d) { return xScale(d.exis); })
        .y(function (d) { return yScale(d.yoyo); })
        .interpolate("linear");

    var svg = d3.select("#chart").append("svg").attr({ width: w, height: h });

    var yAxis = svg.append("g").call(yAxisGen)
                        .attr("class", "y-axis")
                        .attr("transform", "translate(" + padding  + ", 0)");

    var xAxis = svg.append("g").call(xAxisGen)
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + (h - padding) + ")");


    var viz = svg.append("path")
                .attr({
                    d: lineFun(ds),
                    "stroke": "purple",
                    "stroke-width": 1,
                    "fill": "none"
                });

    var dots = svg.selectAll("circle")
                           .data(ds)
                           .enter()
                           .append("circle")
                           .attr({
                               cx: function (d) { return xScale(d.exis); },
                               cy: function (d) { return yScale(d.yoyo); },
                               r: 4,
                               "fill": "#666666"
                               //class: "circle-" + ds.category
                           })
                           .on("mouseover", function (d) {
                               tooltip.transition()
                                   .duration(500)
                                   .style("opacity", .9);
                               tooltip.html("<strong> " + d.yoyo + "</strong>")
                                   .style("left", (d3.event.pageX) + "px")
                                   .style("top", (d3.event.pageY - 28) + "px");
                           })
                           .on("mouseout", function (d) {
                               tooltip.transition()
                                   .duration(500)
                                   .style("opacity", 0);
                           });


   
}

d3.json("index2.php", function (error, data) {

    if (error) {
        console.log(error);
    } else {
        console.log(data); //we're los mejores!
        ds = data;
    }

    //var decodedData = JSON.parse(data.content);

    //console.log(decodedData.content);


    //decodedData.contents.forEach(function (content) {
    //    ds = content;
        //console.log(ds);
       // showHeader();
        buildLine(ds);
    //})

});


//d3.json('index2.php', function (data) {
//   // console.log(data);
//    bardata = data;
//    //console.log(bardata.yoyo.length);

    


//});