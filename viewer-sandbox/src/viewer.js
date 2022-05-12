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
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/e2102416acdd10b49b51c58acdf02099');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/f6499a518b7d56fdf918aaa1dda02ee6');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/47216939852a6a177a8ae8b924140c65');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/eebc05e4a8bafecff0d03316bb03bd92');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/f84216590e0ea1db8ea90513cc1236e6');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/3f41e7b029b2327ba4cc6b3036619d24');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/235ffb88c0131c8170bb8243dc3cb253');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/2713c90b8622d73923661dde76f2c597');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/99c214eba0c6c8bada81f1a256742764');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/0ae0f028a5ce34652226e74bbde9d63a');
    await viewer.loadObject('https://speckle.xyz/streams/00613d79b2/objects/f7f3b56df412a68e43e0f227e3fd3958');
    // await viewer.loadObject('https://speckle.xyz/streams/4777dea055/objects/d611a3e8bf64984c50147e3f9238c925');
    console.log(viewer.getObjectsProperties())

    console.log('applyFilter');
    const setGradientColorArea = async () => {
        await viewer.applyFilter({
            colorBy: {
                'type': 'gradient',
                'property': 'area',
                'minValue': 0,
                'maxValue': 500,
                'gradientColors': ['#000099', '#ef75ef'],
                default: '#000000'
            }
        })
    };
    const setGradientColorVolume = async () => {
        await viewer.applyFilter({
            colorBy: {
                'type': 'gradient',
                'property': 'bbox.volume',
                'minValue': 0,
                'maxValue': 5000,
                'gradientColors': ['#000099', '#ef75ef'],
                default: '#000000'
            }
        })
    };
    const setGradientColorSize = async () => {
        await viewer.applyFilter({
            colorBy: {
                'type': 'gradient',
                'property': '_size',
                'minValue': 0,
                'maxValue': 250000,
                'gradientColors': ['#000099', '#578836', '#e5e233'],
                default: '#000000'
            }
        })
    };
    const setBrepColor = async (color) => {
        await viewer.applyFilter({
            colorBy: {
                type: 'category', property: 'speckle_type', values: {
                    'Objects.Geometry.Brep': color,
                    'Objects.Geometry.Mesh': '#a14c06'
                }
            },
            ghostOthers: true
        })
    };
    const filterArea = async () => {
        await viewer.applyFilter({
            filterBy: {
                'speckle_type': ['Objects.Geometry.Polyline']
            },
            ghostOthers: true
        })
    };
    await setBrepColor('#51933b');

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

    const button = (title, click) => {
        const btnDeselect = pane.addButton({
            title: title,
        });
        btnDeselect.on('click', click);
    };
    button('Deselect', () => {
        viewer.interactions.deselectObjects()
    });
    button('Select Brep', () => {
        viewer.interactions.selectObjects(v => v.userData.speckle_type === 'Objects.Geometry.Brep')
    });

    button('Select Poly', () => {
        viewer.interactions.selectObjects(v => v.userData.speckle_type === 'Objects.Geometry.Polyline')
    });
    button('Select Small', () => {
        viewer.interactions.selectObjects(v => v.userData.area < 10 && v.userData.volume > 0)
    });
    button('Filter Poly', () => {
        filterArea();
    });
    button('Color by Area', () => {
        setGradientColorArea();
    });
    button('Color by Bounds', () => {
        setGradientColorVolume();
    });
    button('Color by Size', () => {
        setGradientColorSize();
    });
    pane.on('change', (ev) => {
        if (ev.presetKey === 'color') {
            setBrepColor(ev.value);

        }
        console.log('changed: ' + JSON.stringify(ev.value));
    });

}
