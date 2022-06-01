import { Store } from '@strategies/stores';
import { action, computed, makeObservable, observable } from 'mobx';


export class Rectangle {
    @observable
    left: number = 0;
    @observable
    top: number = 0;
    @observable
    right: number = 0;
    @observable
    bottom: number = 0;

    constructor() {
        makeObservable(this);
    }

    @computed
    get active() {
        return this.right > this.left && this.top > this.bottom;
    }

    @action
    set(left: number, top: number, right: number, bottom: number) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    contains(x: number, y: number) {
        return x >= this.left && x <= this.right && y >= this.bottom && y <= this.top;
    }

    reset() {
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
    }
}

export default class UIStore extends Store {

    constructor() {
        super();
        makeObservable(this);
    }

    @observable
    dataPanelIsOpen: boolean = true;

    @observable
    scatterSelectionArea: Rectangle = new Rectangle();

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

    @observable
    densityRampMax: number = 10000;

    @action
    setDensityRampMax(value: number) {
        this.densityRampMax = value;
    }

    @observable
    zoomToId: string = '';

    @action
    public setZoomToId(value: string) {
        this.zoomToId = value;
    }

}
