import {Pane} from 'tweakpane'
import {Viewer} from '@speckle/viewer'
import './style.css'

async function doThing() {


    const container = document.querySelector<HTMLDivElement>('#renderer')
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


    await viewer.applyFilter({colorBy: {property: 'speckle_type', colors: {'Objects.Geometry.Brep': '#ff0000'}}})

    viewer.on<{ progress: number; id: string; url: string }>('load-progress', (a) => {
        if (a.progress >= 1) {
            viewer.onWindowResize()
        }
    })
}

doThing();
