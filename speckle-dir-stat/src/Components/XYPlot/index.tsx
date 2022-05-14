import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip, AnnotationCircleSubject, GlyphSeries, AnimatedGlyphSeries, Axis,
} from '@visx/xychart';
import React, {FunctionComponent, useMemo} from "react";
import {useStores} from "@strategies/stores";
import {Stores} from "../../stores";
import TreemapVis from "../TreeMap/TreemapVis";
import {observer} from "mobx-react";
import {background, SpaceTreemapProps} from "../TreeMap/SpaceTreemap";
import {EntityDot, TreeNode} from "../../stores/interfaces";
import {scaleLinear} from "@visx/scale";
import {AxisBottom, AxisLeft} from "@visx/axis";

export type XYProps = {
    items: EntityDot[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};


const XYPlot: FunctionComponent<XYProps> = (props) => {
    let xMax = 0;
    let xMin = 0;
    let yMax = 0;
    let yMin = 0;

    props.items.forEach((item) => {
        xMax = Math.max(xMax, item.x);
        xMin = Math.min(xMin, item.x);
        yMax = Math.max(yMax, item.y);
        yMin = Math.min(yMin, item.y);
    });


    console.log("x");
    console.log(xMin);
    console.log(xMax);

    console.log("y");
    console.log(yMin);
    console.log(yMax);


    const accessors = {
        xAccessor: (d: EntityDot) => (d.x - xMin) / (xMax - xMin),
        yAccessor: (d: EntityDot) => (d.y - yMin) / (yMax - yMin),
        size: (d: EntityDot) => 10
    }

    const xScale = useMemo(
        () =>
            scaleLinear<number>({
                // range: [0, 300],
                round: true,
                domain: [xMin, xMax],
            }),
        [xMin, xMax],
    );

    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                // range: [0, 300],
                round: true,
                domain: [yMin, yMax],
            }),
        [yMin, yMax],
    );

    console.log('XY Plot RENDER');

    return (<XYChart
            height={props.height}
            xScale={{type: 'linear', domain: [0, 1], zero: false}}
            yScale={{type: 'linear', domain: [0, 1], zero: false}}>
            <AxisLeft scale={yScale} orientation="left" label={"area"}/>
            <AxisBottom scale={xScale} label={"area"}/>
            {/*<Axis orientation="bottom" label={"size"}/>*/}
            <AnimatedGrid columns={true} numTicks={10}/>
            <AnimatedGlyphSeries dataKey="Model" data={props.items} {...accessors}/>
            {/*<GlyphSeries dataKey="Line 1" data={data1} {...accessors} />*/}
            {/*<AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />*/}
            {/*<Tooltip*/}
            {/*    snapTooltipToDatumX*/}
            {/*    snapTooltipToDatumY*/}
            {/*    showVerticalCrosshair*/}
            {/*    showSeriesGlyphs*/}
            {/*    // renderTooltip={({ tooltipData, colorScale }) => (*/}
            {/*        // <div>*/}
            {/*        //     <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>*/}
            {/*        //         {tooltipData.nearestDatum.key}*/}
            {/*        //     </div>*/}
            {/*        //     {accessors.xAccessor(tooltipData.nearestDatum.datum)}*/}
            {/*        //     {', '}*/}
            {/*        //     {accessors.yAccessor(tooltipData.nearestDatum.datum)}*/}
            {/*        // </div>*/}
            {/*    //)}*/}
            {/*/>*/}
        </XYChart>
    )
}
export default observer(XYPlot);

