import { observer } from "mobx-react";
import { Rectangle } from "../../stores/UIStore";
import { useMemo, useRef } from "react";
import { scaleLinear } from "@visx/scale";

type XYBrushProps = {
    svgRef: SVGSVGElement;
    rectangle: Rectangle;
    xRange: number[];
    yRange: number[];
    xScale: any;//(value: number) => number & {invert:(value: number) => number};
    yScale: any;//(value: number) => number & {invert:(value: number) => number};
    onBrush?: () => void;
};

class DragHelper {
    isDragging: boolean = false;
    svgRef?: SVGSVGElement;
    onDrag?: (startPosition: { x: number, y: number }, position: { x: number, y: number }) => void;
    onDragComplete?: () => void;

    startPosition?: { x: number, y: number };

    beginDrag(e: MouseEvent, svgRef: SVGSVGElement) {
        if (this.isDragging) return;
        this.svgRef = svgRef;
        this.isDragging = true;
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        this.startPosition = this.transformPoint(e);
    }

    mouseUp = (e: MouseEvent) => {
        window.removeEventListener("mouseup", this.mouseUp);
        window.removeEventListener("mousemove", this.mouseMove);

        this.isDragging = false;
        this.onDragComplete && this.onDragComplete()
    }
    mouseMove = (e: MouseEvent) => {
        if (!this.isDragging || !this.startPosition) return;

        this.onDrag && this.onDrag(this.startPosition, this.transformPoint(e));
    }

    transformPoint(e: MouseEvent) {
        if (!this.svgRef) return { x: 0, y: 0 };
        const pt = this.svgRef.createSVGPoint();
        pt.x = e.clientX
        pt.y = e.clientY;
        return pt.matrixTransform(this.svgRef.getScreenCTM()?.inverse());
    }
}

export const XYBrush = observer(({ svgRef, rectangle, xScale, yScale, xRange, yRange, onBrush }: XYBrushProps) => {
    const dragHelper = useMemo(
        () => new DragHelper(),
        [rectangle],
    );

    const selectionBox = {
        x: xScale(rectangle.left),
        y: yScale(rectangle.top),
        width: xScale(rectangle.right) - xScale(rectangle.left),
        height: yScale(rectangle.bottom) - yScale(rectangle.top),
    }
    console.log(rectangle, selectionBox);


    const convertPosition = (x: number, y: number) => {
        return {
            x: xScale.invert(x - xRange[0]),
            y: yScale.invert(y - yRange[1])
        }
    };

    dragHelper.onDrag = (startPosition, position) => {
        const startPos = convertPosition(startPosition.x, startPosition.y);
        const pos = convertPosition(position.x, position.y);
        console.log(startPos, pos);
        rectangle.set(startPos.x, startPos.y, pos.x, pos.y);
    };

    dragHelper.onDragComplete = () => {
        onBrush && onBrush();
    };

    return <g className={'XYBrush'} transform={`translate(${xRange[0]},${yRange[1]})`}>
        <rect fill={'#f3f3f3'} width={xRange[1]} height={yRange[0] - yRange[1]} onMouseDown={(e) => {
            dragHelper.beginDrag(e.nativeEvent, svgRef);
        }}/>
        {rectangle.active && <rect fill={'#c9bcbc'} {...selectionBox}/>}
    </g>;
});
