import React, { FunctionComponent, useState } from 'react';
import { observer } from "mobx-react";
import TreemapVis from "./TreemapVis";
import { TreeNode } from "../../stores/interfaces";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";

const palette:{[key: string]: string} = {
    'Objects.Geometry.Mesh': '#e5e356',
    'Objects.Geometry.Brep': '#57b1c2',
    'Objects.Geometry.Polyline': '#7b41e7',
};
const getColor = (node: any) => {
    // console.log(node);
    const {selected, category, color} = node.data.data;
    // if (!entity) return '#000000';
    if (selected) {
        return '#0000ff'
    }
    return color || palette[category];
};


export const background = '#114b5f';
export type SpaceTreemapProps = {
    treeTotals: TreeNode[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};


const SpaceTreemap: FunctionComponent<SpaceTreemapProps> = (props) => {
    console.log('SpaceTreemap RENDER', props.treeTotals.length);
    const { entities } = useStores() as Stores;

    return <TreemapVis {...props} background={background} getColor={getColor} onClick={(node:any) => {
        const id = node.data.data.id;
        entities.toggleSelection(id);
    }}/>
}
export default observer(SpaceTreemap);
