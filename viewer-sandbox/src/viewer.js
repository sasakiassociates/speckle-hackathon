import {Viewer} from './hacky-sack/viewer'

import {Pane} from "tweakpane";

export const doThing = async () => {
    const container = document.querySelector('#renderer')
    if (!container) {
        throw new Error("Couldn't find #app container!")
    }

// Viewer setup
    const viewer = new Viewer({
        container,
        showStats: true
    })

    window.addEventListener('load', () => {
        viewer.onWindowResize()
    })

// Tweakpane setup
    const PARAMS = {
        factor: 123,
        title: 'hello',
        color: '#ff0055'
    }

    const pane = new Pane()

    pane.addInput(PARAMS, 'factor')
    pane.addInput(PARAMS, 'title')
    pane.addInput(PARAMS, 'color')


    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/2decc3358e013f33da7af52fef29bb1b');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/69bfa91caf1fc4b0c82211cd92387bfb');
    await viewer.loadObject('https://speckle.xyz/streams/4777dea055/objects/d611a3e8bf64984c50147e3f9238c925');
    console.log(viewer.getObjectsProperties())

    console.log('applyFilter');
    const setMeshColor = async (color) => {
        await viewer.applyFilter({
            colorBy: {
                type: 'category', property: 'speckle_type', values: {
                    'Objects.Geometry.Brep': '#a14c06',
                    'Objects.Geometry.Mesh': color
                }
            },
            ghostOthers: true
        })
    };
    await setMeshColor('#51933b');

    const text = pane.addBlade({
        view: 'text',
        label: 'speckle_type',
        parse: (v) => String(v),
        value: '-',
    });
    viewer.on('select', (e) => {
        console.log('select', e);
        if (e.userData.length > 0) {
            text.value = e.userData[0].speckle_type;
        } else {
            text.value = '-';
        }
        pane.refresh();
    });


    viewer.on('load-progress', (a) => {
        if (a.progress >= 1) {
            viewer.onWindowResize()
        }
    })


    const btnDeselect = pane.addButton({
        title: 'Deselect',
    });
    btnDeselect.on('click', () => {
        viewer.interactions.deselectObjects()
    });
    const btn = pane.addButton({
        title: 'Select',
    });
    btn.on('click', () => {
        viewer.interactions.selectObjects(v => v.userData.speckle_type === 'Objects.Geometry.Brep')
    });
    pane.on('change', (ev) => {
        if (ev.presetKey === 'color') {
            setMeshColor(ev.value);

        }
        console.log('changed: ' + JSON.stringify(ev.value));
    });

}
