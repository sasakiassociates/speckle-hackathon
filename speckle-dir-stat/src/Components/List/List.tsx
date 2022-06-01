import {observer} from "mobx-react";
import {Entity} from "../../stores/Entities";
import {useStores} from "@strategies/stores";
import {Stores} from "../../stores";
import {Button} from "@strategies/ui";


type ListItemProps = {
    item: Entity;
};

export const formatBytes = (size: number) => {
    return `${Math.round(10 * (size / 1024)) / 10} kb`;
};
export const formatNum = (val: number) => {
    if (val > 1000) {
        return Math.round(val).toLocaleString();
    }
    return `${Math.round(10 * (val)) / 10}`;
};

export const ListItem = observer(({item}: ListItemProps) => {
    const [a, b, objectTypeDisplay] = item.objectType.split('.');
    const {app, ui} = useStores() as Stores;

    const href = `https://speckle.xyz/streams/${app.streamId}/objects/${item.id}`;
    return <div className={'ListItem' + (item.selected ? ' selected' : '')} onClick={() => {
        // item.setSelected(!item.selected);
    }}>
        <div className={'smaller'}>
            <div className={'label'}>Id</div>
            <div className={'value'}><a href={href} target={'_blank'}>{item.id}</a></div>
        </div>
        <div className={'left'}>
            <div>
                <div className={'label'}>Size</div>
                <div className={'value'}>{formatBytes(item.size)}</div>
            </div>
            <div>
                <div className={'label'}>Bounds</div>
                <div className={'value'}>{formatNum(item.boundingVolume * 100)}</div>
            </div>
            <div>
                <div className={'label'} onClick={() => {
                    ui.setDensityRampMax(item.density);
                }}>Density
                </div>
                <div className={'value'}>{formatNum(item.density)}</div>
            </div>
        </div>
        <div className={'right'}>
            <div>
                <div className={'label'}>Area</div>
                <div className={'value'}>{formatNum(item.area)}</div>
            </div>
            <div>
                <div className={'label'}>Volume</div>
                <div className={'value'}>{formatNum(item.volume)}</div>
            </div>
        </div>
        <div className={'tag'} onClick={() => {
            ui.setZoomToId(item.id);
        }}>{objectTypeDisplay}</div>

    </div>
});

type ListProps = {};

export const List = observer(({}: ListProps) => {
    const {entities, ui, app} = useStores() as Stores;

    return <div className={'List'}>
        {entities.selectedDescending.map(e => <ListItem key={e.id} item={e}/>)}
        <Button onClick={() => {
            ui.setFilterMode(!ui.filterMode)
        }}>{ui.filterMode ? 'Clear Filter' : 'Filter'}</Button>
        <Button onClick={() => {
            app.sendSelected(entities.selected);
        }} disabled={entities.selected.length === 0}>{'Send'}</Button>
    </div>
});
