import React, {
    useMemo,
    useState,
    useCallback,
    MouseEvent,
    TouchEvent, FunctionComponent,
} from 'react'

import {extent, min} from 'd3-array'

import {AxisBottom, AxisLeft} from '@visx/axis'
import {Circle} from '@visx/shape'
import {useTooltip} from '@visx/tooltip'
import {localPoint} from '@visx/event'
import {voronoi} from '@visx/voronoi'

import {Text} from '@visx/text'
import {Group} from '@visx/group'
import {scaleLinear} from '@visx/scale'
import {EntityDot} from "../../stores/interfaces";

// import { useRerender } from 'hooks/useRerender'
// import { stitchesTheme } from 'stitches'
// import { box } from 'styles/box'
// import { text } from 'styles/text'
// import { data } from 'data/index'
// import type { WeatherEntry } from 'data/types'

import {getDimensions, yAccessor, xAccessor, valueAccessor} from './utils'
import {observer} from "mobx-react";

// import Tooltip, { TooltipData } from './components/Tooltip'

export type XYProps = {
    items: EntityDot[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

const ScatterPlot: FunctionComponent<XYProps> = (props) => {


    const {margin, boundedWidth, boundedHeight} = getDimensions(props.width, props.height)

    const [activeEntry, setActiveEntry] = useState<EntityDot>()

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

    const xScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [xMin, xMax],
                domain: extent(props.items, xAccessor) as [number, number],
                nice: true,
            }),
        [boundedWidth]
    )

    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [yMin, yMax],
                domain: extent(props.items, yAccessor) as [number, number],
                nice: true,
            }),
        [boundedHeight]
    )

    const voronoiLayout = useMemo(() => {
        return voronoi<EntityDot>({
            x: (d) => xScale(xAccessor(d)),
            y: (d) => yScale(yAccessor(d)),
            width: boundedWidth,
            height: boundedHeight,
        })(props.items)
    }, [boundedWidth, boundedHeight, xScale, yScale])

    const voronoiPolygons = useMemo(() => voronoiLayout.polygons(), [
        voronoiLayout,
    ])

    // const handleMouseMove = useCallback(
    //     (e: TouchEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
    //         const point = localPoint(e)
    //         if (!point) return hideTooltip()
    //
    //         const {x, y} = point
    //         const neighborRadius = 100
    //         const closest = voronoiLayout.find(
    //             x - margin.left,
    //             y - margin.top,
    //             neighborRadius
    //         )
    //
    //         if (!closest) return
    //
    //         maybe(data.find((d) => d.date === closest.data.date)).map(setActiveEntry)
    //
    //         showTooltip({
    //             tooltipLeft: xScale(xAccessor(closest.data)) + margin.left,
    //             tooltipTop: yScale(yAccessor(closest.data)) + margin.top,
    //             tooltipData: {
    //                 dewPoint: closest.data.dewPoint,
    //                 date: new Date(closest.data.date),
    //             },
    //         })
    //     },
    //     [xScale, yScale, voronoiLayout, voronoiPolygons]
    // )

    // const cloudsColorScale = useMemo(
    //     () =>
    //         scaleLinear<string>({
    //             range: [
    //                 stitchesTheme.colors.blue.value,
    //                 stitchesTheme.colors.gold.value,
    //             ],
    //             domain: extent(data, cloudAccessor) as [number, number],
    //         }),
    //     []
    // )

    const dots = useMemo(
        () =>
            props.items.map((d) => (
                <Circle
                    key={d.id}
                    fill={d.color}
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessor(d))}
                    r={5}
                />
            )),
        [xScale, yScale]
    )

    const activeDot = activeEntry && (
        <Circle
            key={`active-${activeEntry.id}`}
            cx={xScale(xAccessor(activeEntry))}
            cy={yScale(yAccessor(activeEntry))}
            r={5}
            fill={'#2e3440'}
        />
    )
    //
    // const axisLeftLabel = (
    //     <Text
    //         textAnchor="middle"
    //         verticalAnchor="end"
    //         angle={-90}
    //         className="left-label">
    //         Relative humidity
    //     </Text>
    // )
    //
    // const axisBottomLabel = (
    //     <Text
    //         className={text({fontSize: 'lg'})}
    //         textAnchor="middle"
    //         verticalAnchor="start"
    //         y={boundedHeight}
    //         x={boundedWidth / 2}
    //         dy={30}
    //     >
    //         Dew point (°F)
    //     </Text>
    // )

    return (
        <div className={"box"}>
            <svg
                width={width}
                height={height}
                // onTouchStart={handleMouseMove}
                // onTouchMove={handleMouseMove}
                // onMouseMove={handleMouseMove}
                // onMouseLeave={() => hideTooltip()}
                role="figure"
            >
                <title>
                    Scatterplot looking at the relation between relative humidity and dew
                    point
                </title>
                <Group top={margin.top} left={margin.left}>
                    <AxisLeft
                        numTicks={4}
                        scale={yScale}
                        top={0}
                        tickLabelProps={() => ({
                            fill: '#1c1917',
                            fontSize: 10,
                            textAnchor: 'end',
                            verticalAnchor: 'middle',
                            x: -10,
                        })}
                    />
                    {/*{axisLeftLabel}*/}
                    <AxisBottom
                        top={boundedHeight}
                        scale={xScale}
                        tickLabelProps={() => ({
                            fill: '#1c1917',
                            fontSize: 11,
                            textAnchor: 'middle',
                        })}
                    />
                    {/*{axisBottomLabel}*/}
                    {dots}
                    {activeDot}
                </Group>
            </svg>

            {/*<Tooltip*/}
            {/*    isTooltipOpen={tooltipOpen}*/}
            {/*    left={tooltipLeft}*/}
            {/*    top={tooltipTop}*/}
            {/*    data={tooltipData}*/}
            {/*/>*/}
        </div>
    )
}

export default observer(ScatterPlot);

