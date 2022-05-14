import { Store } from '@strategies/stores';
import { action, computed, observable, makeObservable } from 'mobx';


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

    @observable
    loadModalIsOpen: boolean = true;

    @action
    setLoadModalOpen(isOpen = true) {
        this.loadModalIsOpen = isOpen;
    }

    @observable
    selectionPanelIsOpen: boolean = true;

    @action
    setSelectionPanelOpen(isOpen = true) {
        this.selectionPanelIsOpen = isOpen;
    }

    @computed
    get layout(): string {
        if (!this.dataPanelIsOpen) {
            return 'A';
        }

        return '';
    }

    @observable
    filterMode: boolean = false;

    @action
    setFilterMode(filterMode = true) {
        this.filterMode = filterMode;
    }


}
