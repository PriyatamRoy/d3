var lineData = [{
        x: 1,
        y: 5
    }, {
        x: 20,
        y: 20
    }, {
        x: 40,
        y: 10
    }, {
        x: 60,
        y: 40
    }, {
        x: 80,
        y: 5
    }, {
        x: 100,
        y: 60
    }];

var svgWidth = 800;
var svgHeight = 500;
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

var svg = d3.select("body")
        .append("svg")
        .attr("id", "visualisation")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

var xScale = d3.scaleLinear()
        .range([margin.left, svgWidth - margin.right])
        .domain([d3.min(lineData, function (d) {
                return d.x;
            }), d3.max(lineData, function (d) {
                return d.x;
            })]);

var yScale = d3.scaleLinear()
        .range([svgHeight - margin.top, margin.bottom])
        .domain([d3.min(lineData, function (d) {
                return d.y
            }), d3.max(lineData, function (d) {
                return d.y
            })]);

var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(5);

var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(5);

svg.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (svgHeight - margin.bottom) + ')')
        .call(xAxis);

svg.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (margin.left) + ',0)')
        .call(yAxis);

var lineFunc = d3.line()
        .x(function (d) {
            return xScale(d.x);
        })
        .y(function (d) {
            return yScale(d.y);
        })

svg.append('svg:path')
        .attr('d', lineFunc(lineData))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');