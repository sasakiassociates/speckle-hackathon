import { register } from '@strategies/stores';

import UIStore from './stores/UIStore';
import Entities from './stores/Entities';


export type Stores = {
    ui: UIStore;
    entities: Entities;
}


export default function initializeStores() {
    register({
        ui: new UIStore(),
        entities: new Entities(),
    })
}
