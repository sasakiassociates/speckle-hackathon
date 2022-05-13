import { action, computed, makeObservable, observable } from "mobx";

export class Entity {
    constructor(id: string) {
        makeObservable(this);

        this.id = id;
    }

    @observable
    public id: string;

    @observable
    public size: number = 0;

    @observable
    public selected: boolean = false;

    @action
    setSelected(b: boolean) {
        this.selected = b;
    }
}

export default class Entities {
    //region constructor
    constructor() {
        makeObservable(this);
    }

    //endregion

    //region fields
    public enabled: boolean = false;
    //endregion

    //region observables
    @observable
    public list: Entity[] = [];
    //endregion

    //region actions
    @action
    public addEntity(entity: Entity) {
        this.list.push(entity);
    }

    //endregion

    //region getter/setters
    @observable
    age: number = 0;

    @action
    public setAge(value: number) {
        this.age = value;
    }

    //endregion

    //region computed properties
    @computed
    get selectedIds() {
        return this.list.filter(e => e.selected).map(e => e.id);
    }

    //endregion

    //region public methods

    //endregion

    //region private methods

    //endregion
}
