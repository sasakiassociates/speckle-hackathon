import {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import {ColorCommonInstance} from "d3";
import {Entity} from "../../stores/Entities";
import {observer} from "mobx-react";

export type TreeMapProps = { data: Entity[], width: number, height: number };


// copy pasta from https://github.com/russ430/treemap/blob/master/src/Treemap.js
export const Treemap = observer(({data, width, height}: TreeMapProps) => {
    const svgRef = useRef(null);
    const legendRef = useRef(null);

    function renderTreemap() {
        const svg = d3.select(svgRef.current);
        svg.selectAll('g').remove();

        const legendContainer = d3.select(legendRef.current);
        legendContainer.selectAll('g').remove();

        svg.attr('width', width).attr('height', height);

        console.log("Data");
        console.log(data);

        let nestedData = d3.group(data, d => d.objectType);

        console.log("Nested Data");
        console.log(nestedData);
        // check what this does
        const root = d3
            .hierarchy(data)
            .sum((d : any) => {d.size} )
        // @ts-ignore
        .sort((a, b) => b!.length - a!.length)

        console.log("Root");
        console.log(root);

        // create treemap layout
        const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

        // create 'g' element nodes based on data
        const nodes = svg
            .selectAll('g')
            .data(treemapRoot.leaves())
            .join('g')
            .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

        // create color scheme and fader
        const fader = (color: string | ColorCommonInstance) => d3.interpolateRgb(color, '#fff')(0.3);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader))

        // add treemap rects
        nodes
            .append('rect')
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            // @ts-ignore
            .attr('fill', (d) => colorScale(d.value));

        const fontSize = 12;

        // add text to rects
        nodes
            .append('text')
            // @ts-ignore
            .text((d) => `${d.data} ${d.data.value}`)
            .attr('data-width', (d) => d.x1 - d.x0)
            .attr('font-size', `${fontSize}px`)
            .attr('x', 3)
            .attr('y', fontSize)
            .call(wrapText);

        function wrapText(selection: any) {
            selection.each(function () {
                //@ts-ignore
                const node = d3.select(this);
                const rectWidth = +node.attr('data-width');
                let word: string | undefined;
                const words = node.text().split(' ').reverse();
                let line: string[] = [];
                let lineNumber = 0;
                const x = node.attr('x');
                const y = node.attr('y');
                let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
                while (words.length > 1) {
                    word = words.pop();
                    if (word) {
                        line.push(word);
                        tspan.text(line.join(' '));
                        // @ts-ignore
                        const tspanLength = tspan.node().getComputedTextLength();
                        if (tspanLength > rectWidth && line.length !== 1) {
                            line.pop();
                            tspan.text(line.join(' '));
                            line = [word];
                            tspan = addTspan(word);
                        }
                    }

                }
                addTspan(words.pop() || '');

                function addTspan(text: string) {
                    lineNumber += 1;
                    return node
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${lineNumber * fontSize}px`)
                        .text(text);
                }
            });
        }

        // pull out hierarchy categories
        let categories = root.leaves().map((node) => node.data);

        categories = categories.filter(
            (category, index, self) => self.indexOf(category) === index,
        );

        legendContainer.attr('width', width).attr('height', height / 4);

        // create 'g' elements based on categories
        const legend = legendContainer.selectAll('g').data(categories).join('g');

        // create 'rects' for each category
        legend
            .append('rect')
            .attr('width', fontSize)
            .attr('height', fontSize)
            .attr('x', fontSize)
            .attr('y', (_, i) => fontSize * 2 * i)
        // .attr('fill', (d) => colorScale(d));

        // add text to each category key
        legend
            .append('text')
            .attr('transform', `translate(0, ${fontSize})`)
            .attr('x', fontSize * 3)
            .attr('y', (_, i) => fontSize * 2 * i)
            .style('font-size', fontSize)
            // .text((d) => d.name);
    }


    useEffect(() => {
        renderTreemap();
    }, [data]);

    return (
        <div className='TreeMap'>
            <svg ref={svgRef}/>
        </div>
    )
});
