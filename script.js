document.addEventListener('DOMContentLoaded', function () {

    fetch('cyclist-data.json')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            let myDataSet = data.map((item) => {
                return {
                    seconds: parseFloat((item.Seconds / 60).toFixed(2)),
                    name: item.Name,
                    year: Date.parse(item.Year),
                    place: item.Place,
                    time: item.Time
                }
                // parseFloat((item.Seconds / 60).toFixed(2))
            })
            console.log(myDataSet);
            
// let tryMe = d3.min(myDataSet, d => d.time);
// let parseMe = locale.parse('%X');
// let newNew = parseMe(tryMe);
// console.log(newNew);
            // // let formatTime = d3.timeFormat("%I:%M");
            // let formatMinute = d3.timeFormat("%I:%M");
            // let minute;
            // let thisWork = formatMinute(minute);
            // console.log(thisWork);
            // let formatMin = formatMinute(tryMe);
            // console.log(formatMin);

            const w = 1000;
            const h = 750;

            //Minimum and Maximum Values for the Year
            let yearMin = d3.min(myDataSet, d => d.year);
            console.log(yearMin);
            let yearMax = d3.max(myDataSet, d => d.year);
            console.log(yearMax);

            let formatTime = d3.timeFormat("%Y");
            let minTime = formatTime(yearMin);
            console.log(minTime);
            let maxTime = formatTime(yearMax);
            console.log(maxTime)

            let margin = {
                top: 40, right: 20, bottom: 50, left: 100
            };

            const innerWidth = w - margin.left - margin.right;
            const innerHeight = h - margin.top - margin.bottom;


            //Min and Max for the time in seconds
            let timeMax = d3.max(myDataSet, d => d.seconds);
            // console.log(timeMax);

            let timeMin = d3.min(myDataSet, d => d.seconds);
            console.log(timeMin);




            const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            const xScale = d3.scaleTime()
                .domain([(yearMin - 2), (yearMax)])
                .range([0, innerWidth])
                .nice();

            const xAxis = d3.axisBottom(xScale);
            const xAxisLabel = 'Year';

            const yScale = d3.scaleLinear()
                .domain([timeMin, timeMax])
                .range([innerHeight, margin.bottom]);

            const yAxis = d3.axisLeft(yScale);
            const yAxisLabel = 'Time in Minutes';

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const yAxisG = g.append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('class', 'y-axis');

            const xAxisG = g.append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${innerHeight})`)
                .attr('id', 'x-axis');

            g.selectAll("circle")
                .data(myDataSet)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.year))
                .attr("cy", d => yScale(d.seconds))
                .attr('r', 5)
                .attr("fill", (d) =>{
                    if (d.place <= 11) {
                        return 'magenta'
                    }
                    else if (d.place >= 23) {
                        return 'turquoise'
                    }
                    else {
                        return 'blue'
                    }
                })
                .append('title')
                .text(d => d.name + ' ')
                .append('title')
                .text((d) => d.seconds + ' - ')
                .append('title')
                .text(d => formatTime(new Date(d.year + 100000000)));

            g.append('text')
                .attr('x', 300)
                .text('Professional Bicycle Racing')
                .attr('id', 'title');

            g.append('text')
                .attr('x', 320)
                .text("35 Fastest times up Alpe d'Huez")
                .attr('y', 20)
                .attr('id', 'subTitle');

            yAxisG.append('text')
                .attr('id', 'yAxisLabel')
                .attr('transform', 'rotate (-90, -15, 40) translate(-60)')
                .attr('fill', 'black')
                .text(yAxisLabel);

            xAxisG.append('text')
                .attr('id', 'xAxisLabel')
                .attr('y', 50)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text(xAxisLabel);

            svg.append("circle")
                .attr("cx", 920)
                .attr("cy", 325)
                .attr("r", 6)
                .style("fill", "magenta");

            svg.append("text")
                .attr("x", 830)
                .attr("y", 330)
                .text("Places 1 -11")
                .style("font-size", "1em");


            svg.append("circle")
                .attr("cx", 920)
                .attr("cy", 355)
                .attr("r", 6)
                .style("fill", "blue");

            svg.append("text")
                .attr("x", 830)
                .attr("y", 360)
                .text("Places 12-23")
                .style("font-size", "1em");


            svg.append("circle")
                .attr("cx", 920)
                .attr("cy", 385)
                .attr("r", 6)
                .style("fill", "turquoise");

            svg.append("text")
                .attr("x", 830)
                .attr("y", 390)
                .text("Places 24-35")
                .style("font-size", "1em");

        })
})