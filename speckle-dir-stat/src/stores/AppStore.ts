import { Store } from '@strategies/stores';
import { action, makeObservable, observable } from 'mobx';
import { buildUrl, exchangeAccessCode, goToSpeckleAuthPage, send, speckleLogOut } from '../Components/SpeckleApi';
import { Entity } from "./Entities";


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


    @action
    logout() {
        speckleLogOut();
    }

    @action
    exchangeAccessCode(accessCode: string) {
        return exchangeAccessCode(accessCode, this.serverUrl);
    }

    @action
    redirectToAuth() {
        goToSpeckleAuthPage(this.serverUrl);
    }


    @observable
    serverUrl: string = '';

    @action
    setServerUrl(serverUrl: string) {
        this.serverUrl = serverUrl;
    }

    @observable
    streamId: string = '';

    @action
    setStreamId(streamId: string) {
        this.streamId = streamId;
    }

    @observable
    commitId: string = '';

    @action
    setCommitId(commitId: string) {
        this.commitId = commitId;
    }

    async getObjectUrl(): Promise<string> {
        if (this.url !== '') {
            const url = new URL(this.url);

            const splitUrl = url.pathname.split('/');

            this.setStreamId(splitUrl[2]);
            this.setCommitId(splitUrl[4]);
            this.setServerUrl(url.origin);

            return await buildUrl(this.streamId, this.commitId, this.serverUrl, this.token);
        }

        return '';
    }

    @action
    sendSelected(entities: Entity[]) {
        const token: string = this.token === undefined ? '' : this.token;

        if (this.token !== '' || entities?.length === 0) {
            return send(entities, this.streamId, this.serverUrl, token)
        }
    }


    // async sendObject(): Promise<string> {
    //
    //     const token: string = this.token === undefined ? '' : this.token;
    //
    //     if (this.token !== '')
    //         return await send(this.streamId, this.serverUrl, token)
    //
    // }
}
