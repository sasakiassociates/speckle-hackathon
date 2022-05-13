import { Store } from '@strategies/stores';
import { action, observable, makeObservable } from 'mobx';


export default class AppStore extends Store {

    constructor() {
        super();
        makeObservable(this);
    }

    @observable
    clean: boolean = true;

    @action
    makeUnclean() {
        this.clean = false;
    }

    @observable
    url: string = '';

    @action
    setUrl(url: string) {
        this.url = url;
    }

}
