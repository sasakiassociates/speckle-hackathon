import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Viewer } from './hacky-sack/viewer'
import Entities, { Entity } from "./stores/Entities";


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
    entities: Entities;
};

export const List = observer(({ entities }: ListProps) => {

    return <div className={'List'}>
        {entities.list.map(e => <ListItem key={e.id} item={e}/>)}
    </div>
});
