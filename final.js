var dur = 1000

var recalculateScalesLines = function(money, lengths)
{
    var getIncomes = function(entry)
    {
        return entry.Income
    };
    var Incomes = money.map(getIncomes);
    
    var xScale = d3.scaleBand()
        .domain(Incomes)
        .range([0,lengths.graph.width])
    
    var y1Line = d3.scaleLinear()
        .domain([0,1])
        .range([lengths.graph.height,0])
    
    var y2Line = d3.scaleLinear()
        .domain([1,7])
        .range([lengths.graph.height,0]);
    
    return {xScale:xScale, y1Line:y1Line, y2Line:y2Line};
};

var updateLines = function(target, money, lengths)
{
    var scales = recalculateScalesLines(money, lengths);
    var xScale = scales.xScale;
    var y1Line = scales.y1Line;
    var y2Line = scales.y2Line;
    
    updateAxesLines(target,xScale,y1Line,y2Line)
    
    var lineGeneratorThree = d3.line()
        .x(function(entry)
          {
            return xScale(entry.Income)
        })
        .y(function(entry)
          {
            return y1Line(entry.Big_Three)
        })

    
    var lineGeneratorFive = d3.line()
        .x(function(entry)
          {
            return xScale(entry.Income)
        })
        .y(function(entry)
          {
            return y1Line(entry.Big_Five)
        })

    
    var lineGeneratorKnow = d3.line()
        .x(function(entry)
          {
            return xScale(entry.Income)
        })
        .y(function(entry)
          {
            return y2Line(entry.Financial_Knowledge)
        })

    
    var lineGeneratorMat = d3.line()
        .x(function(entry)
          {
            return xScale(entry.Income)
        })
        .y(function(entry)
          {
            return y2Line(entry.Financial_Matters)
        })

    
    
    var lineThree = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "big_ThreeLine")
        .classed("line", true)
        .classed("hidden", false)
        .selectAll("path")
        .data(money)
    
    lineThree.enter()
        .append("path")
    
    lineThree.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #big_ThreeLine")
        .selectAll("path")
        .datum(money)
        .transition()
        .duration(dur)
        .attr("d", lineGeneratorThree)
        .attr("fill", "none")
        .attr("stroke", "#b2df8a")
        .attr("stroke-width", "4")
        .attr("transform", "translate("+63+")");    
    
    
    var lineFive = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "big_FiveLine")
        .classed("line", true)
        .classed("hidden", false)
        .selectAll("path")
        .data(money);
    
    lineFive.enter()
        .append("path");
    
    lineFive.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #big_FiveLine")
        .selectAll("path")
        .datum(money)
        .transition()
        .duration(dur)
        .attr("d", lineGeneratorFive)
        .attr("fill", "none")
        .attr("stroke", "#33a02c")
        .attr("stroke-width", "4")
        .attr("transform", "translate("+63+")");
    
    
    var lineKnow = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "KnowLine")       
        .classed("line", true)
        .classed("hidden", false)
        .selectAll("path")
        .data(money);
    
    lineKnow.enter()
        .append("path");
    
    lineKnow.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #KnowLine")
        .selectAll("path")
        .datum(money)
        .transition()
        .duration(dur)
        .attr("d", lineGeneratorKnow)
        .attr("fill", "none")
        .attr("stroke", "#1f78b4")
        .attr("stroke-width", "4")
        .attr("transform", "translate("+63+")")
    
    
    var lineMat =  d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "MatLine")
        .classed("line", true)
        .classed("hidden", false)
        .selectAll("path")
        .data(money);
    
    lineMat.enter()
        .append("path");
    
    lineMat.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #MatLine")
        .selectAll("path")
        .datum(money)
        .transition()
        .duration(dur)
        .attr("d", lineGeneratorMat)
        .attr("fill", "none")
        .attr("stroke", "#a6cee3")
        .attr("stroke-width", "4")
        .attr("transform", "translate("+63+")")
}

var updateCircles = function(target, money, lengths)
{
    var scales = recalculateScalesLines(money, lengths);
    var xScale = scales.xScale;
    var y1Line = scales.y1Line;
    var y2Line = scales.y2Line;
    
    
    var threeCircle = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "threeCircle")
        .selectAll("circle")
        .data(money);
    
    threeCircle.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 300);
    
    threeCircle.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #threeCircle")
        .selectAll("circle")
        .transition()
        .duration(dur)
        .attr("cx", function(entry)
             {
                return xScale(entry.Income)
            })
        .attr("cy", function(entry)
             {
                return y1Line(entry.Big_Three)
        })
        .attr("r", 5)
        .attr("fill", "#b2df8a")
        .attr("transform", "translate("+63+")")
   
    
    var fiveCircle = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "fiveCircle")
        .selectAll("circle")
        .data(money);
    
    fiveCircle.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 300);
    
    fiveCircle.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #fiveCircle")
        .selectAll("circle")
        .transition()
        .duration(dur)
        .attr("cx", function(entry)
             {
                return xScale(entry.Income)
            })
        .attr("cy", function(entry)
             {
                return y1Line(entry.Big_Five)
        })
        .attr("r", 5)
        .attr("fill", "#33a02c")
        .attr("transform", "translate("+63+")"); 
    
    
    var knowCircle = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "knowCircle")
        .selectAll("circle")
        .data(money);
    
    knowCircle.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 300);
    
    knowCircle.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #knowCircle")
        .selectAll("circle")
        .transition()
        .duration(dur)
        .attr("cx", function(entry)
             {
                return xScale(entry.Income)
            })
        .attr("cy", function(entry)
             {
                return y2Line(entry.Financial_Knowledge)
        })
        .attr("r", 5)
        .attr("fill", "#1f78b4")
        .attr("transform", "translate("+63+")"); 
    
    var matCircle = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "matCircle")
        .selectAll("circle")
        .data(money);
    
    matCircle.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 600);
    
    matCircle.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #matCircle")
        .selectAll("circle")
        .transition()
        .duration(dur)
        .attr("cx", function(entry)
             {
                return xScale(entry.Income)
            })
        .attr("cy", function(entry)
             {
                return y2Line(entry.Financial_Matters)
        })
        .attr("r", 5)
        .attr("fill", "#a6cee3")
        .attr("transform", "translate("+63+")");     

}


var createLabels = function(lengths,target)
{
    var labels = d3.select(target)
        .append("g")
        .classed("labels", true)
    
    labels.append("g")
        .attr("id", "graphtitle")
        .attr("transform", "translate("+(lengths.graph.width/2+lengths.margins.left)+","+(lengths.margins.top-7)+")")
        .append("text")
        .text("Income Levels Based on Assessments")
        .classed("title", true)
        .attr("text-anchor", "middle")
    
    labels.append("g")
        .attr("id", "leftLabel")
        .attr("transform","translate(20,"+ 
              (lengths.margins.top+(lengths.graph.height/2))+")")
        .append("text")
        .text("Percentage of Correctness on Questions")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
        .attr("stroke", "green")
    
    labels.append("g")
        .attr("id", "rightLabel")
        .attr("transform", "translate("+(lengths.margins.left+lengths.graph.width+55)+","+(lengths.graph.height/2+15)+")")
        .append("text")
        .text("Average Personal Rating")
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

var initAxes = function(lengths, target)
{
    var axes = d3.select(target)
        .append("g")
        .classed("axes", true)
    
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

var updateAxesLines = function(target,xScale,y1Line,y2Line)
{
    var xAxis = d3.axisBottom(xScale)
    var yLeft = d3.axisLeft(y1Line)
    var yRight = d3.axisRight(y2Line)
    
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

var legend = function(target, lengths)
{
    var legend = d3.select(target)
        .append("g")
        .classed("legend", true)
        .attr("transform", "translate("+(lengths.graph.width+lengths.margins.left+30)+","+(lengths.margins.top)+")")
    
    var entries = legend.selectAll("g")
        .data(["Percentage Correctness on Big 3 Financial Questions", "Percentage Correctness on Big 5 Financial Questions", "Average Personal Rating on Financial Knowledge", "Average Personal Rating on Handling Financial Matters"])
        .enter()
        .append("g")
        .classed("legendEntry", true);
    
    //big 3
    entries.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#b2df8a")
        .attr("transform", "translate("+0+","+(36)+")");

    
    entries.append("text")
        .text("Percentage Correctness on Big 3 Financial Questions")
        .attr("x", 15)
        .attr("y", 46)
        .attr("fill", "#b2df8a")
    
    //big 5
    entries.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#33a02c")
        .attr("transform", "translate("+0+","+(54)+")")
    
    entries.append("text")
        .text("Percentage Correctness on Big 5 Financial Questions")
        .attr("x", 15)
        .attr("y", 64)
        .attr("fill", "#33a02c")
    
    //financial knowledge
    entries.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#a6cee3")
    
    entries.append("text")
        .text("Average Personal Rating on Financial Knowledge")
        .attr("x", 15)
        .attr("y", 10)
        .attr("fill", "#a6cee3")
    
    //financial matters
    entries.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#1f78b4")
        .attr("transform", "translate("+0+","+(18)+")")

    entries.append("text")
        .text("Average Personal Rating on Handling Financial Matters")
        .attr("x", 15)
        .attr("y", 28)
        .attr("fill", "#1f78b4")
}

var drawxLines = function(target, money, lengths)
{   
    var lineOne = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalOne")
        .selectAll("line")
        .data(money);
    
    lineOne.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineOne.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #verticalOne")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left-12)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left-12)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineTwo = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalTwo")
        .selectAll("line")
        .data(money)
    
    lineTwo.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineTwo.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalTwo")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+113.5)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+113.5)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineThree = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalThree")
        .selectAll("line")
        .data(money)
    
    lineThree.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineThree.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalThree")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+239)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+239)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineFour = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalFour")
        .selectAll("line")
        .data(money)
    
    lineFour.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineFour.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalFour")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+364.5)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+364.5)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineFive = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalFive")
        .selectAll("line")
        .data(money)
    
    lineFive.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineFive.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalFive")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+490.5)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+490.5)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineSix = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalSix")
        .selectAll("line")
        .data(money)
    
    lineSix.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineSix.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalSix")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+616)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+616)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineSeven = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalSeven")
        .selectAll("line")
        .data(money)
    
    lineSeven.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineSeven.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalSeven")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+741.5)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+741.5)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
    
    var lineEight = d3.select(target)
        .select(".graph")
        .append("g")
        .attr("id", "verticalEight")
        .selectAll("line")
        .data(money)
    
    lineEight.enter()
        .append("line")
        .attr("x1", (lengths.graph.width/2))
        .attr("x2", (lengths.graph.width/2))
        .attr("y1", 0)
        .attr("y2", 0);
    
    lineEight.exit()
        .remove()
    
    d3.select(target)
        .select(".graph #verticalEight")
        .selectAll("line")
        .transition()
        .duration(dur)
        .attr("x1", lengths.margins.left+867)
        .attr("y1", lengths.graph.height)
        .attr("x2", lengths.margins.left+867)
        .attr("y2", lengths.margins.top-28)
        .attr("stroke", "grey");
    
}

var initLineGraph = function(target, money)
{
    var screen = {width:1500, height:600}
    var margins = {top:30, bottom:40, left:75, right:420}
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
        .classed("pLines", true)
        .attr("id", "lines")
        .classed("hidden", false)
        .attr("transform", "translate("+ lengths.margins.left + "," + lengths.margins.top + ")");
    
    createLabels(lengths,target)
    initAxes(lengths,target);
    updateLines(target,money,lengths);
    drawxLines(target, money, lengths);
    updateCircles(target,money,lengths);
    legend(target,lengths);
};

var clearpLines = function(target, money)
{
    d3.selectAll(".pLines")
        .remove();
}
var clearRect = function(target,money)
{
    d3.selectAll(".barChart")
        .remove();
}

var setButtons = function(target, money)
{
    d3.select("#barChartButton")//barChart
        .on("click", function()
            {               
                clearpLines(target,money);
                initHist(target, money);
            });
    
    d3.select("#pLineButton")
        .on("click", function()
            {
                clearRect(target,money);
                initLineGraph(target,money);
            });
};


//histogram stuff
var RecalculateScalesHist = function(money, lengths)
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
            .range([20,lengths.graph.width-20])
            .paddingInner(.5);
    
    var y1Hist = d3.scaleLinear()
            .domain([0,1])
            .range([lengths.graph.height,0]);
    
    var y2Hist = d3.scaleLinear()
            .domain([1,7])
            .range([lengths.graph.height,0]);
    
    return {xBase:xBase, y1Hist:y1Hist, y2Hist:y2Hist};
};

var updateRects = function(target,money,lengths)
{
    var scales = RecalculateScalesHist(money,lengths);
    var xBase = scales.xBase
    var y1 = scales.y1Hist;
    var y2 = scales.y2Hist;
    
    updateAxesHist(target,xBase,y1,y2);
    
    var rectsThree = d3.select(target)
        .select(".barChart")
        .append("g")
        .attr("id", "big_Three")
        .selectAll("rect")
        .data(money);

    rectsThree.enter()
        .append("rect")
        .attr("x", 600)
        .attr("y", 650);
    
    rectsThree.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #big_Three")
        .selectAll("rect")
        .transition()
        .duration(dur)
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
        .attr("fill", "#b2df8a")
        .attr("stroke", "black")
        .on("click", function(money)
            {
                var on = d3.select("#big_Three")    
                            .classed("off");
                
                if(on)
                    {
                        d3.select("#big_Three")
                            .classed("off", true);
                        d3.selectAll("rect")
                            .classed("off", true);
                    }
                else
                    {
                        d3.select("#big_Three")
                            .classed("off", false);
                        d3.selectAll("rect")
                            .classed("off", false);
                    };
            });

    
   
    var rectsFive = d3.select(target)
        .select(".barChart")
        .append("g")
        .attr("id", "big_Five")
        .selectAll("rect")
        .data(money);
    
    rectsFive.enter()
        .append("rect")
        .attr("x", 600)
        .attr("y", 650);
    
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
        .attr("fill", "#33a02c")
        .attr("stroke", "black");   

    
    rectsFin = d3.select(target)
        .select(".barChart")
        .append("g")
        .attr("id", "financial")
        .selectAll("rect")
        .data(money);

    rectsFin.enter()
        .append("rect")
        .attr("x", 600)
        .attr("y", 650);
    
    rectsFin.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #financial")
        .selectAll("rect")
        .transition()
        .duration(dur)
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
        .attr("fill", "#1f78b4") 
        .attr("stroke", "black");   

    
    
    rectsKnow = d3.select(target)
        .select(".barChart")
        .append("g")
        .attr("id", "knowledge")
        .selectAll("rect")
        .data(money);
    
    rectsKnow.enter()
        .append("rect")        
        .attr("x", 600)
        .attr("y", 650);
    
    rectsKnow.exit()
        .remove();
    
    d3.select(target)
        .select(".graph #knowledge")
        .selectAll("rect")
        .transition()
        .duration(dur)
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
        .attr("fill", "#a6cee3")
        .attr("stroke", "black");   

};

var initAxesHist = function(lengths, target)
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

var updateAxesHist = function(target,xBase,y1Hist,y2Hist)
{
    var xAxis = d3.axisBottom(xBase)
    var yLeft = d3.axisLeft(y1Hist)
    var yRight = d3.axisRight(y2Hist)
    
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

var initHist = function(target, money)
{
    var screen = {width:1500, height:600}
    var margins = {top:30, bottom:40, left:75, right:420}
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
        .classed("barChart", true)
        .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    initAxesHist(lengths, target);
    updateRects(target, money, lengths);
};



var tablePromise = d3.csv("IncomeData.csv")
tablePromise.then(function(money)
{
    console.log("money", money);
    initLineGraph("svg", money);
    console.log(money.columns[1]);
    setButtons("svg",money);
},
function(err)
{
    console.log("Error", err)
});