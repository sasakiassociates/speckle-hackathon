import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Viewer } from './viewer'
import { autorun, reaction } from "mobx";
import Entities, { Entity } from "../../stores/Entities";
import { useStores, stores } from "@strategies/stores";
import { Stores } from "../../stores";

//making a react component with mobx that can interface with e.g. selections

const loadEntities = async (viewer: Viewer, entities: Entities) => {
    const { app, ui } = stores as Stores;

    await viewer.loadObject(`https://speckle.xyz/streams/${app.streamId}/objects/${app.objectId}`)
    // for await (const entity of entities.list) {
    //     ;//${entity.id}`);
    //
    // }

    // console.log(viewer.allObjects.filter(o => !!o.userData?.id));

    for (const o of viewer.allObjects.filter(o => !!o.userData?.id)) {
        // const entity = entities.list.find(e => e.id === o.userData.id);
        const entity = new Entity(o.userData.id);
        entity.setSize(o.userData._size);
        entity.setArea(o.userData.area);
        entity.setVolume(o.userData.volume);
        entity.setBoundingVolume(o.userData.bbox?.volume);
        entity.setObjectType(o.userData.speckle_type);
        entities.addEntity(entity);
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
    //
    reaction(
        () => ui.filterMode,
        (filterMode) => {
            if (dontReact) return;
            selfInflicted = true;
            if (filterMode) {
                viewer.applyFilter({
                    filterBy: {
                        'id': entities.selectedIds
                    },
                    colorBy: {
                        'type': 'gradient',
                        'property': '_size',
                        'minValue': 0,
                        'maxValue': 1000,
                        'gradientColors': ['#1f0454', '#c8255c'],
                        default: '#000000'
                    },
                    // colorBy: {
                    //     type: 'category', property: 'speckle_type', values: {
                    //         'Objects.Geometry.Brep': '#a14c06',
                    //         'Objects.Geometry.Mesh': '#ee934c'
                    //     }
                    // },
                    ghostOthers: true
                })
            } else {
                viewer.applyFilter({
                    ghostOthers: false
                })
            }
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

    // @ts-ignore
    const { entities, ui } = useStores() as Stores;

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
                showStats: false
            });

            loadEntities(viewer.current, entities);

        }

    }, [entities]);

    return <div ref={node => {
        divRef = node;
    }} className={'ViewerControl'}/>
});
