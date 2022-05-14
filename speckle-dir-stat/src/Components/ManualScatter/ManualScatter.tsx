import { observer } from "mobx-react";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";
import { Entity } from "../../stores/Entities";
import { scaleLinear } from "@visx/scale";
import { useMemo } from "react";

type PlotPointProps = {
    item: Entity;
};
export const PlotPoint = observer(({item}: PlotPointProps) => {
    return <div className={'PlotPoint'}></div>
});
type ManualScatterProps = {
    value: string;
    setValue: (value: string) => void;
};
export const ManualScatter = observer(({value, setValue}: ManualScatterProps) => {
    const { entities } = useStores() as Stores;
    //
    // const xScale = useMemo(
    //     () =>
    //         scaleLinear<number>({
    //             round: true,
    //             domain: [0, Math.max(...data.map(getLetterFrequencx))],
    //         }),
    //     [xMin, xMax],
    // );
    // const yScale = useMemo(
    //     () =>
    //         scaleLinear<number>({
    //             range: [yMax, 0],
    //             round: true,
    //             domain: [0, Math.max(...data.map(getLetterFrequency))],
    //         }),
    //     [yMax],
    // );

    return <div className={'ManualScatter'}>
        <svg>
            {entities.selectedDescending.map(e => <PlotPoint key={e.id} item={e}/>)}
        </svg>
    </div>
});
