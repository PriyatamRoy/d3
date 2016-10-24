function InitChart() {
    var barData = [{
            'x': 1,
            'y': 5
        }, {
            'x': 20,
            'y': 20
        }, {
            'x': 40,
            'y': 10
        }, {
            'x': 60,
            'y': 40
        }, {
            'x': 80,
            'y': 5
        }, {
            'x': 100,
            'y': 60
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
            .attr("id", "barVisualisation")
            .attr("width", svgWidth)
            .attr("height", svgHeight);



//var xScale = d3.scaleOrdinal()
    //      .rangeRound([margin.left, svgWidth - margin.right],0.1)
    //    .domain(barData.map(function(d){
    //      return d.x;
    //}));

    var xScale = d3.scaleBand()
            .domain(d3.range(0, barData.length)) //barData.map(function (d){return d.x;})
            .rangeRound([margin.left, svgWidth - margin.right])
            .paddingInner(0.05);


    var yScale = d3.scaleLinear()
            .range([svgHeight - margin.top, margin.bottom])
            .domain([0, d3.max(barData, function (d) {
                    return d.y
                })]);

    var xAxis = d3.axisBottom(xScale);

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


    svg.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .style("fill", "steelblue")
            .attr('x', function (d, i) { // sets the x position of the bar
                return xScale(i);
            })
            .attr('y', function (d) { // sets the y position of the bar
                return yScale(d.y);
            })
            .attr('width', xScale.bandwidth()) // sets the width of bar
            .attr('height', function (d) {      // sets the height of bar
                return ((svgHeight - margin.bottom) - yScale(d.y));
            })
            .attr('fill', 'grey');   // fills the bar with grey color

}

InitChart();