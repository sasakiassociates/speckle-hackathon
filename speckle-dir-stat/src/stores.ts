import { register } from '@strategies/stores';

import UIStore from './stores/UIStore';
import Entities from './stores/Entities';
import AppStore from './stores/AppStore';


export type Stores = {
    app: AppStore;
    ui: UIStore;
    entities: Entities;
}


export default function initializeStores() {
    register({
        app: new AppStore(),
        ui: new UIStore(),
        entities: new Entities(),
    })
}
