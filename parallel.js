var drawLines = function(money, lenghts, target, xScale, y1)
{
    var lineGeneratorLeft = d3.line()
        .x(function(entry)
          {
            return xScale(entry.Income)
        })
        .y(function(entry)
          {
            return y1(entry.Big_Three)
        })
    
    var lines = d3.select(target)
        .select(".graph")
        .selectAll("g")
        .data(money)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill", "none")
        .attr("stroke", "black")
    
    lines.append("path")
        .datum(money)
        .attr("d", lineGeneratorLeft)
}

var initGraph = function(target, money)
{
    var screen = {width:1200, height:600}
    var margins = {top:30, bottom:40, left:75, right:75}
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    var lengths = {
        screen:screen,
        margins:margins,
        graph:graph,
    }
    
    d3.select(target)
        .attr("width",lengths.screen.width)
        .attr("height",lengths.screen.height)
    
    var g = d3.select(target)
        .append("g")
        .classed("graph", true)
        .attr("transform", "translate("+ lengths.margins.left + "," + lengths.margins.top + ")");
    
    
        var getIncomes = function(entry)
    {
        return entry.Income
    };
    var Incomes = money.map(getIncomes);
    
    var xScale = d3.scaleLinear()
        .domain([Incomes])
        .range([0,lengths.graph.width])
    
    var y1 = d3.scaleLinear()
        .domain([0,1])
        .range([lengths.graph.height,0])
    
    var y2 = d3.scaleLinear()
        .domain([1,7])
        .range([lengths.graph.height,0]);
    
    drawLines(money, lengths, target, xScale, y1)
}

//"Less than $15000", "$15000-$24000", "$35000-$49000", "$50000-$74000", "$75000-$99000", "$100000-$149000", "More than $150000"

var tablePromise = d3.csv("IncomeData.csv")
tablePromise.then(function(money, target)
{
    console.log("money", money);
    initGraph("svg", money);
},
function(err)
{
    console.log("Error", err)
});