import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Viewer } from './viewer'
import { autorun, reaction } from "mobx";
import Entities from "../../stores/Entities";
import { useStores } from "@strategies/stores";
import { Stores } from "../../stores";

//making a react component with mobx that can interface with e.g. selections

const loadEntities = async (viewer: Viewer, entities: Entities) => {
    for await (const entity of entities.list) {
        await viewer.loadObject(`https://speckle.xyz/streams/00613d79b2/objects/${entity.id}`);

    }

    // autorun(() => {
    //     const selectedIds = entities.list.filter(e => e.selected).map(e => e.id);
    //     viewer.interactions.selectObjects(v => selectedIds.indexOf(v.userData.id) >= 0);
    // })

    let selfInflicted = false;
    let dontReact = false;
    reaction(
        () => entities.selectedIds,
        selectedIds => {
            if (dontReact) return;
            selfInflicted = true;
            viewer.interactions.selectObjects(v => selectedIds.indexOf(v.userData.id) >= 0);
            selfInflicted = false;
        }
    )

    viewer.on('select', (e: any) => {
        if (selfInflicted) return;
        console.log('select', e);

        dontReact = true;
        if (e.userData.length > 0) {
            const ids = e.userData.map((v: { id: any; }) => v.id);
            console.log('selected ID', ids);

            for (const entity of entities.list) {
                entity.setSelected(ids.indexOf(entity.id) >= 0);
                console.log('selected', entity.id, entity.selected);
            }
        } else {
            for (const entity of entities.list) {
                entity.setSelected(false);
            }
        }
        dontReact = false;
    });
}

let runOnce = false;

type ViewerProps = {
};

export const ViewerControl = observer(({ }: ViewerProps) => {
    const { entities } = useStores() as Stores;

    const viewer = useRef<Viewer | null>(null);
    let divRef: HTMLDivElement | null;
    console.log('ViewerControl render');
    useEffect(() => {
        if (divRef) {
            if (runOnce) return;//SHOULD NOT BE NEEDED when passing empty array as deps, but something is up...
            runOnce = true;
            console.log('useEffect RUNNING');
            viewer.current = new Viewer({
                container: divRef,
                showStats: true
            });

            loadEntities(viewer.current, entities);

        }

    }, [entities]);

    return <div ref={node => {
        divRef = node;
    }} className={'ViewerControl'}/>
});