import {Viewer} from './hacky-sack/viewer'

import {Pane} from "tweakpane";

export const doThing = async ()=> {
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

// Load demo object
    await viewer.loadObject(
        'https://speckle.xyz/streams/00613d79b2/objects/2decc3358e013f33da7af52fef29bb1b'
    )
    console.log(viewer.getObjectsProperties())

    console.log('applyFilter');
    await viewer.applyFilter({colorBy: {type:'category', property: 'speckle_type.maxValue', colors: {'Objects.Geometry.Brep': '#9021a1'}}})

    viewer.on('load-progress', (a) => {
        if (a.progress >= 1) {
            viewer.onWindowResize()
        }
    })
}
