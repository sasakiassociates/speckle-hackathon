import type {Dimensions} from './types'
import {EntityDot} from "../../stores/interfaces";

function getDimensions({
                           width,
                           height,
                       }: {
    width: number
    height: number
}): Dimensions {
    const margin = {
        top: 100,
        right: 10,
        bottom: 60,
        left: 70,
    }

    return {
        margin,
        boundedWidth: width - margin.left - margin.right,
        boundedHeight: height - margin.top - margin.bottom,
    }
}

const yAccessor = (d: EntityDot) => d.y
const xAccessor = (d: EntityDot) => d.x
const valueAccessor = (d: EntityDot) => d.value

export {getDimensions, yAccessor, xAccessor, valueAccessor}
