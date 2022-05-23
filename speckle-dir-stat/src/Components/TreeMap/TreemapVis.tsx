import React, { useState } from 'react';
import { Group } from '@visx/group';
import {
    Treemap,
    hierarchy,
    stratify,
    treemapSquarify,
    treemapSliceDice,
} from '@visx/hierarchy';

import { Text } from '@visx/text';
import { defaultStyles, Tooltip, withTooltip } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { TreeNode } from "../../stores/interfaces";

// export const color1 = '#f3e9d2';
// const color2 = '#4281a4';

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };


type TooltipData = {
    node: TreeNode;
    // key: SpaceTypes;
    // index: number;
    // height: number;
    // width: number;
    // x: number;
    // y: number;
    // color: string;
};
const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
};

export type TreemapVisProps = {
    treeTotals: TreeNode[];
    background: string;
    getStroke: (node: any) => StrokeSettings;
    width: number;
    strokeOpacity?: number;
    sliceDice?: boolean;
    getColor: (node: any) => string;
    onClick?: (node: any) => void;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

let tooltipTimeout: number;

type StrokeSettings = { strokeColor: string, strokeWidth: number, strokeOpacity: number };
type TreemapRectProps = {
    nodeWidth: number;
    nodeHeight: number;
    node: any;
    getStroke: (node: any) => StrokeSettings;
    getColor: (node: any) => string;
    onClick: () => void
    onMouseMove: () => void
    onMouseLeave: () => void
};
export const TreemapRect = (props: TreemapRectProps) => {
    const {
        nodeWidth,
        nodeHeight,
        getStroke,
        getColor,
        node,
        onClick,
        onMouseMove,
        onMouseLeave
    } = props;
    const { strokeColor, strokeWidth, strokeOpacity } = getStroke(node);
    return <rect
        // rx={4}
        // ry={4}
        width={nodeWidth}
        height={nodeHeight}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        fill={getColor(node)}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    />
}


// export default withTooltip<TreemapVisProps, TooltipData>({ width, height, treeTotals, margin = defaultMargin }: TreemapVisProps & WithTooltipProvidedProps<TooltipData>) {
export default withTooltip<TreemapVisProps, TooltipData>(
    ({
         getColor, background, getStroke, sliceDice, strokeOpacity, onClick,
         width, height, treeTotals, margin = defaultMargin,
         tooltipOpen,
         tooltipLeft,
         tooltipTop,
         tooltipData,
         hideTooltip,
         showTooltip,
     }: TreemapVisProps & WithTooltipProvidedProps<TooltipData>) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // const colorScale = scaleOrdinal<string, string>({
        //     domain: Object.keys(roomTypeColors),
        //     range: Object.keys(roomTypeColors).map(k => roomTypeColors[k]),
        // });
        strokeOpacity = strokeOpacity || 0.1;

        const data = stratify<TreeNode>()
            .id(d => d.id)
            .parentId(d => d.parent)(treeTotals)
            .sum(d => d.area || 0);

        // const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));
        const root = hierarchy(data);

        const method = sliceDice ? treemapSliceDice : treemapSquarify

        return width < 10 ? null : (
            <div>
                <div>
                    <svg width={width} height={height}>
                        <rect width={width} height={height} rx={14} fill={background}/>
                        <Treemap<typeof data>
                            top={margin.top}
                            paddingOuter={(node) => {
                                return node.depth === 1 ? 1.5 : 0.25;
                            }}
                            root={root}
                            size={[xMax, yMax]}
                            tile={method}
                            round
                        >
                            {treemap => (
                                <Group>
                                    {treemap
                                        .descendants()
                                        .reverse()
                                        .map((node, i) => {
                                            const nodeWidth = node.x1 - node.x0;
                                            const nodeHeight = node.y1 - node.y0;
                                            return (
                                                <Group
                                                    key={`node-${i}`}
                                                    top={node.y0 + margin.top}
                                                    left={node.x0 + margin.left}
                                                >
                                                    {node.depth === 1 && nodeWidth > 50 && (
                                                        <g transform={`translate(${3},${3})`}>
                                                            {nodeHeight > 80 && <Text
                                                                verticalAnchor={'start'}
                                                                className={nodeWidth > 100 ? 'treemap-label-main' : 'treemap-label-main-sm'}
                                                                width={Math.min(200, nodeWidth)}
                                                                dx={4}
                                                                dy={24}
                                                                scaleToFit={false}>
                                                                {node.data.data.label?.join(' | ')}
                                                            </Text>}
                                                            <Text
                                                                verticalAnchor={'start'}
                                                                className={'treemap-label'}
                                                                width={Math.min(200, nodeWidth)}
                                                                dx={4}
                                                                dy={8}
                                                                scaleToFit={false}>
                                                                {node.data.data.total && Math.round(node.data.data.total).toLocaleString()}
                                                            </Text>
                                                            {/*<text*/}
                                                            {/*    className={'treemap-label-main'}*/}
                                                            {/*    dx={4}*/}
                                                            {/*    dy={14}*/}
                                                            {/*    width={nodeWidth}*/}
                                                            {/*    height={50}*/}
                                                            {/*    fill="black">{node.data.data.label?.join(' | ')}*/}
                                                            {/*</text>*/}
                                                            {/*<text*/}
                                                            {/*    className={'treemap-label'}*/}
                                                            {/*    dx={4}*/}
                                                            {/*    dy={32}*/}
                                                            {/*    width={nodeWidth}*/}
                                                            {/*    height={50}*/}
                                                            {/*    fill="black">{node.data.data.total && Math.round(node.data.data.total).toLocaleString()} ASF*/}
                                                            {/*</text>*/}
                                                        </g>
                                                    )}
                                                    {(!node.children || node.children.length === 0) &&
                                                        <TreemapRect
                                                            node={node}
                                                            nodeWidth={nodeWidth} nodeHeight={nodeHeight}
                                                            getStroke={getStroke} getColor={getColor}
                                                            onMouseLeave={() => {
                                                                tooltipTimeout = window.setTimeout(() => {
                                                                    hideTooltip();
                                                                }, 300);
                                                            }}
                                                            onMouseMove={() => {
                                                                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                                                const top = node.y0 + margin.top;
                                                                const left = node.x0 + margin.left;
                                                                showTooltip({
                                                                    tooltipData: { node: node.data.data },
                                                                    tooltipTop: top,
                                                                    tooltipLeft: left,
                                                                });
                                                            }}
                                                            onClick={() => {
                                                                if (onClick) onClick(node);
                                                            }}
                                                        />
                                                    }
                                                </Group>
                                            );
                                        })}
                                </Group>
                            )}
                        </Treemap>
                    </svg>
                    {tooltipOpen && tooltipData && (
                        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                            <div>{tooltipData.node.label?.join(' | ')}</div>
                        </Tooltip>
                    )}
                </div>
            </div>
        );
    }
);
