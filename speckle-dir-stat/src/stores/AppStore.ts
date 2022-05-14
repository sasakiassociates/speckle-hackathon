import {Store} from '@strategies/stores';
import {action, observable, makeObservable, computed} from 'mobx';
import {speckleApi} from '../Components/SpeckleApi';


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

    // streamId: string = '89ef27f57b';
    // objectId: string = '572a2fa02ca00e0231b36274db10b5c9'

    streamId: string = '00613d79b2';
    objectId: string = '9683eb354c0fc9a725756528f4007645'

    // @action
    // setStreamId(streamId: string) {
    //     this.streamId = streamId;
    // }
    //
    // @computed
    // commitId: string = '';
    //
    // @action
    // setCommitId(commitId: string) {
    //     this.commitId = commitId;
    // }


    // async loadDataFromStream() {
    //     // console.log(await speckleApi());
    // }
}
