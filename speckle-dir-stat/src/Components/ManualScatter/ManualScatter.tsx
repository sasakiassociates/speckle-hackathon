import { observer } from "mobx-react";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";
import { scaleLinear, scaleLog } from "@visx/scale";
import { useMemo } from "react";
import { EntityDot } from "../../stores/interfaces";
import { AxisBottom, AxisLeft } from "@visx/axis";

type PlotPointProps = {
    dot: EntityDot;
    xScale: (value: number) => number;
    yScale: (value: number) => number;
};
export const PlotPoint = observer(({ dot, xScale, yScale }: PlotPointProps) => {
    const { entities } = useStores() as Stores;

    return <circle className={'PlotPoint'} fill={dot.color} strokeWidth={dot.selected ? 4 : 1}
                   stroke={dot.selected ? '#0000ff' : '#999999'} cx={xScale(dot.x)} cy={yScale(dot.y)} r={5}
                   opacity={0.5}
                   onClick={() => {
                       entities.toggleSelection(dot.id);
                   }}/>
});
type ManualScatterProps = {
    width: number,
    height: number
};
const whiteTicks = '#cccccc';

export const ManualScatter = observer(({ width, height }: ManualScatterProps) => {
    const { entities } = useStores() as Stores;

    let xMax = 0;
    let xMin = Number.MAX_VALUE;
    let yMax = 0;
    let yMin = Number.MAX_VALUE;

    entities.activeXYPlot.forEach((item) => {
        xMax = Math.max(xMax, item.x);
        xMin = Math.min(xMin, item.x);
        yMax = Math.max(yMax, item.y);
        yMin = Math.min(yMin, item.y);
    });

    const paddingLeft = 50;
    const padding = 10;
    const xScale = useMemo(
        () =>
            scaleLog<number>({
                range: [paddingLeft, width - padding - paddingLeft],
                round: true,
                domain: [xMin, xMax],
            }),
        [xMin, xMax],
    );
    let bottom = height - 20 - padding * 2;
    const yScale = useMemo(
        () =>
            scaleLog<number>({
                range: [bottom, padding],
                round: true,
                domain: [yMin, yMax],
            }),
        [yMin, yMax],
    );

    return <div className={'ManualScatter'}>
        <svg width={width} height={height+10}>
            {entities.activeXYPlot.map(e => <PlotPoint key={e.id} dot={e} xScale={xScale} yScale={yScale}/>)}
            <text textAnchor="middle" fontSize={'12px'} x={width/2} y={bottom + 40}>Bounding Box Volume (log scale)</text>
            <text textAnchor="middle" fontSize={'12px'} transform={`translate(${paddingLeft-30}, ${height/2}) rotate(-90) `}>Byte Size (log scale)</text>
            <AxisBottom
                top={bottom}
                scale={xScale}
                stroke={whiteTicks}
                tickStroke={whiteTicks}
                tickLabelProps={() => ({
                    fill: whiteTicks,
                    fontSize: 11,
                    textAnchor: 'middle',
                })}
            />
            <AxisLeft
                left={paddingLeft}
                scale={yScale}
                stroke={whiteTicks}
                tickStroke={whiteTicks}
                tickLabelProps={() => ({
                    fill: whiteTicks,
                    fontSize: 11,
                    textAnchor: 'middle',
                })}
            />
        </svg>
    </div>
});
