import { Store } from '@strategies/stores';
import { action, observable, makeObservable } from 'mobx';


export default class UIStore extends Store {

    constructor() {
        super();
        makeObservable(this);
    }
    
    @observable
    dataPanelIsOpen: boolean = true;

    @action
    setDataPanelOpen(isOpen = true) {
        this.dataPanelIsOpen = isOpen;
    }
}
