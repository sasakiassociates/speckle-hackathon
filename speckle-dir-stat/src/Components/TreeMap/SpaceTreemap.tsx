import React, { FunctionComponent, useState } from 'react';
import { observer } from "mobx-react";
import TreemapVis from "./TreemapVis";
import { TreeNode } from "../../stores/interfaces";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";

const palette: { [key: string]: string } = {
    'Objects.Geometry.Mesh': '#e5e356',
    'Objects.Geometry.Brep': '#57b1c2',
    'Objects.Geometry.Polyline': '#7b41e7',
};
const getColor = (node: any) => {
    const { category, color } = node.data.data;
    return color || palette[category];
};


const getStroke = (node: any) => {
    // console.log(node);
    const { selected } = node.data.data;
    // if (!entity) return '#000000';
    if (selected) {
        return { strokeColor: '#0000ff', strokeWidth: 3, strokeOpacity: 1 }
    }
    return { strokeColor: '#ffffff', strokeWidth: 1, strokeOpacity: 0.5 }
};


export const background = '#ffffff';
export type SpaceTreemapProps = {
    treeTotals: TreeNode[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};


const SpaceTreemap: FunctionComponent<SpaceTreemapProps> = (props) => {
    console.log('SpaceTreemap RENDER', props.treeTotals.length);
    const { entities } = useStores() as Stores;

    return <div className={'SpaceTreemap'}><TreemapVis {...props} getStroke={getStroke} background={background}
                                                       strokeOpacity={0.5} getColor={getColor} onClick={(node: any) => {
        const id = node.data.data.id;
        entities.toggleSelection(id);
    }}/>
        <div className={'title'}>Elements scaled by Byte Size, colored by 'Density'</div>
    </div>
}
export default observer(SpaceTreemap);
