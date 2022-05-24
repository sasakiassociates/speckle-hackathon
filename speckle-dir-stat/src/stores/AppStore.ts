import {Store} from '@strategies/stores';
import {action, observable, makeObservable} from 'mobx';
import {buildUrl} from '../Components/SpeckleApi';


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

    @observable
    token?: string;

    @action
    setToken(token: string) {
        this.token = token;
    }

    streamId: string = '070d4ec5a3';
    objectId: string = '448851b898cc662235d93c7358197e8f';

    // streamId: string = '89ef27f57b';
    // objectId: string = '572a2fa02ca00e0231b36274db10b5c9'

    // streamId: string = '00613d79b2';
    // objectId: string = '9683eb354c0fc9a725756528f4007645'

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


    async getObjectUrl(): Promise<string> {
        if (this.url !== '') {
            const url = new URL(this.url);

            const splitUrl = url.pathname.split('/');
            const streamId = splitUrl[2];
            const commitId = splitUrl[4];

            return await buildUrl(streamId, commitId, `${url.protocol}//${url.hostname}`, this.token);
        }

        return '';
    }
}
