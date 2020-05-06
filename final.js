var dur = 500;

var RecalculateScales = function(money, lengths)
{
//make Incomes an array
    var getIncomes = function(entry)
    {
        return entry.Income
    };
    var Incomes = money.map(getIncomes);

//make scales    
    var xBase = d3.scaleBand()
            .domain(Incomes)
            .range([50,lengths.graph.width-50])
            .paddingInner(.5);
    
    var xLine = d3.scaleLinear()
            .domain([Incomes])
            .range([50,lengths.graph.width-50]);
    
    var y1 = d3.scaleLinear()
            .domain([0,1])
            .range([lengths.graph.height,0]);
    
    var y2 = d3.scaleLinear()
            .domain([1,7])
            .range([lengths.graph.height,0]);
    
    return {xBase:xBase, y1:y1, y2:y2};
};

var updateGraph = function(target,money,lengths)
{
    var scales = RecalculateScales(money,lengths);
    var xBase = scales.xBase
    var xLine = scales.xLine
    var y1 = scales.y1;
    var y2 = scales.y2;
    
    updateAxes(target,xBase,y1,y2)
    
    var rectsThree = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "big_Three")
        .selectAll("rect")
        .data(money);

    rectsThree.enter()
        .append("rect");
    
    rectsThree.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #big_Three")
        .selectAll("rect")
        .transition()
        .duration(500)
        .attr("x", function(entry)
             {
                return xBase(entry.Income)-8
            })
        .attr("y", function(entry)
            {
                return y1(entry.Big_Three)
            })
        .attr("width", 20)
        .attr("height", function(entry)
            {
                return lengths.graph.height - y1(entry.Big_Three);
            })
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", "rgb(0,204,0)")
        .attr("stroke", "black");   
    
   
    var rectsFive = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "big_Five")
        .selectAll("rect")
        .data(money);
    
    rectsFive.enter()
        .append("rect");
    
    rectsFive.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #big_Five")
        .selectAll("rect")
        .transition()
        .duration(dur)
        .attr("x", function(entry)
             {
                return xBase(entry.Income)+12
            })
        .attr("y", function(entry)
            {
                return y1(entry.Big_Five)
            })
        .attr("width", 20)
        .attr("height", function(entry)
            {
                return lengths.graph.height - y1(entry.Big_Five);
            })
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", "rgb(102,204,0)")
        .attr("stroke", "black");   

    
    rectsFin = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "financial")
        .selectAll("rect")
        .data(money);

    rectsFin.enter()
        .append("rect");
    
    rectsFin.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #financial")
        .selectAll("rect")
        .transition()
        .duration(500)
        .attr("x", function(entry)
                    {
                        return xBase(entry.Income)+32
                    })
        .attr("y", function(entry)
                    {
                        return y2(entry.Financial_Matters)
                    })
        .attr("width", 20)
        .attr("height", function(entry)
                    {
                        return lengths.graph.height - y2(entry.Financial_Matters);
                    })
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", "rgb(102,178,255)") 
        .attr("stroke", "black");   

    
    
    rectsKnow = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "knowledge")
        .selectAll("rect")
        .data(money);
    
    rectsKnow.enter()
        .append("rect");
    
    rectsKnow.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #knowledge")
        .selectAll("rect")
        .transition()
        .duration(500)
        .attr("x", function(entry)
                    {
                        return xBase(entry.Income)+52
                    })
        .attr("y", function(entry)
                    {
                        return y2(entry.Financial_Knowledge)
                    })
        .attr("width", 20)
        .attr("height", function(entry)
                    {
                        return lengths.graph.height - y2(entry.Financial_Knowledge);
                    })
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", "rgb(153,204,255)")
        .attr("stroke", "black");   

};

var createLabels = function(lengths,target)
{
    var labels = d3.select(target)
        .append("g")
        .classed("labels", true)
    
    labels.append("g")
        .attr("id", "graphtitle")
        .attr("transform", "translate("+(lengths.graph.width/2+lengths.margins.left)+","+lengths.margins.top+")")
        .append("text")
        .text("Income Levels Based on Assessments")
        .classed("title", true)
        .attr("text-anchor", "middle")
    
    labels.append("g")
        .attr("id", "leftLabel")
        .attr("transform","translate(20,"+ 
              (lengths.margins.top+(lengths.graph.height/2))+")")
        .append("text")
        .text("Percentage of Correctness on Big Three Financial Questions")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
        .attr("stroke", "green")
    
    labels.append("g")
        .attr("id", "rightLabel")
        .attr("transform", "translate("+(lengths.margins.left+lengths.graph.width+55)+","+(lengths.graph.height/2+15)+")")
        .append("text")
        .text("Average Personal Rating on Handling Financial Matters")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
        .attr("stroke", "blue")
    
    labels.append("g")
        .attr("id", "xAxisLabel")
        .attr("transform", "translate("+(lengths.graph.width/2+lengths.margins.left)+","+(lengths.graph.height+lengths.margins.top+lengths.margins.bottom)+")")
        .append("text")
        .text("Income Levels")
        .classed("title", true)
        .attr("text-anchor", "middle")
};

var createLegend = function(lengths, target)
{
    var legend = d3.select(target)
        .append("g")
        .classed("legend", true)
        .attr("transform", "translate("+(lengths.margins.left+10)+","+(lengths.margins.top+10)+")")
    
    var entries = legend.selectAll("g")
}
    
var initAxes = function(lengths, target)
{
    var axes = d3.select(target)
        .append("g")
        .classed("class", "axis")
    
    axes.append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+lengths.margins.left+","
             +(lengths.margins.top+lengths.graph.height)+")")
    
    axes.append("g")
        .attr("id","leftAxis")
        .attr("transform","translate("+(lengths.margins.left)+","
             +(lengths.margins.top)+")")
        .attr("stroke", "green")
    
    axes.append("g")
        .attr("id", "rightAxis")
        .attr("transform", "translate("+(lengths.margins.left+lengths.graph.width)+","+(lengths.margins.top)+")")
        .attr("stroke", "blue")
};

var updateAxes = function(target,xBase,y1,y2)
{
    var xAxis = d3.axisBottom(xBase)
    var yLeft = d3.axisLeft(y1)
    var yRight = d3.axisRight(y2)
    
    d3.select("#xAxis")
        .transition()
        .duration(dur)
        .call(xAxis)
    
    d3.select("#leftAxis")
        .transition()
        .duration(dur)
        .call(yLeft)
    
    d3.select("#rightAxis")
        .transition()
        .duration(dur)
        .call(yRight)
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
        .attr("width", screen.width)
        .attr("height", screen.height)
    
    var g = d3.select(target)
        .append("g")
        .classed("graph", true)
        .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    initAxes(lengths, target);
    updateGraph(target, money, lengths);
    createLabels(lengths,target);
};



var tablePromise = d3.csv("IncomeData.csv")
tablePromise.then(function(money)
{
    console.log("money", money);
    console.log(money[0].Income);
    console.log(money[0].Big_Three);
    console.log(money[0].Financial_Matters);
    console.log(money.columns[0]);
    initGraph("svg",money);
},
function(err)
{
    console.log("Error", err)
});
