import { register } from '@strategies/stores';

import UIStore from './stores/UIStore';


export type Stores = {
    ui: UIStore;
}


export default function initializeStores() {
    register({
        ui: new UIStore(),
    })
}
