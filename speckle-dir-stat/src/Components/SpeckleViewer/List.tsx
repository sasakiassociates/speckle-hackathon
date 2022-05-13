import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Viewer } from './viewer'
import Entities, { Entity } from "../../stores/Entities";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";


type ListItemProps = {
    item: Entity;
};

export const ListItem = observer(({ item }: ListItemProps) => {
    return <div className={'ListItem' + (item.selected ? ' selected' : '')} onClick={() => {
        item.setSelected(!item.selected);
    }}>
        {item.id}
    </div>
});

type ListProps = {
};

export const List = observer(({ }: ListProps) => {
    const { entities } = useStores() as Stores;

    return <div className={'List'}>
        {entities.list.map(e => <ListItem key={e.id} item={e}/>)}
    </div>
});
