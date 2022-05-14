import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import React, {FunctionComponent} from "react";
import {useStores} from "@strategies/stores";
import {Stores} from "../../stores";
import TreemapVis from "../TreeMap/TreemapVis";
import {observer} from "mobx-react";
import {background, SpaceTreemapProps} from "../TreeMap/SpaceTreemap";
import {TreeNode} from "../../stores/interfaces";

const data1 = [
    {x: '2020-01-01', y: 50},
    {x: '2020-01-02', y: 10},
    {x: '2020-01-03', y: 20},
];

const data2 = [
    {x: '2020-01-01', y: 30},
    {x: '2020-01-02', y: 40},
    {x: '2020-01-03', y: 80},
];

const accessors = {
    // @ts-ignore
    xAccessor: d => d.x,
    // @ts-ignore
    yAccessor: d => d.y,
};

export type XYProps = {
    treeTotals: TreeNode[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};


const XYPlot: FunctionComponent<XYProps> = (props) => {
    console.log('SpaceTreemap RENDER');

    const {entities} = useStores() as Stores;


    return (<XYChart height={props.height} xScale={{type: 'band'}} yScale={{type: 'linear'}}>
            <AnimatedAxis orientation="bottom"/>
            <AnimatedGrid columns={false} numTicks={4}/>
            <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
            <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
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

