import { observer } from "mobx-react";

type ManualScatterProps = {
    value: string;
    setValue: (value: string) => void;
};
export const ManualScatter = observer(({value, setValue}: ManualScatterProps) => {
    return <div className={'ManualScatter'}>
        <svg>

        </svg>
    </div>
});
