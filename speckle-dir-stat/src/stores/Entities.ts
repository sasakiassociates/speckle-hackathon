import { action, computed, makeObservable, observable } from "mobx";
import { Store } from "@strategies/stores";

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
    public area: number = 0;
    @observable
    public volume: number = 0;
    @observable
    public boundingVolume: number = 0;
    @observable
    public objectType: string = '';

    @action
    setSize(size: number) {
        this.size = size;
    }

    @action
    setArea(size: number) {
        this.area = size;
    }

    @action
    setVolume(size: number) {
        this.volume = size;
    }

    @action
    setBoundingVolume(size: number) {
        this.boundingVolume = size;
    }

    @action
    setObjectType(objectType: string) {
        this.objectType = objectType;
    }

    @observable
    public selected: boolean = false;

    @action
    setSelected(b: boolean) {
        this.selected = b;
    }
}

export default class Entities extends Store {
    //region constructor
    constructor() {
        super();
        makeObservable(this);
    }

    onRegister() {
        //TEMP
        // this.addEntity(new Entity('9683eb354c0fc9a725756528f4007645'));
        // this.addEntity(new Entity('2decc3358e013f33da7af52fef29bb1b'));
        // this.addEntity(new Entity('69bfa91caf1fc4b0c82211cd92387bfb'));
        // this.addEntity(new Entity('e2102416acdd10b49b51c58acdf02099'));
        // this.addEntity(new Entity('f6499a518b7d56fdf918aaa1dda02ee6'));
        // this.addEntity(new Entity('47216939852a6a177a8ae8b924140c65'));
        // this.addEntity(new Entity('eebc05e4a8bafecff0d03316bb03bd92'));
        // this.addEntity(new Entity('f84216590e0ea1db8ea90513cc1236e6'));
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

    @computed
    get sizeDescending() {
        const arr = [...this.list];
        arr.sort((a, b) => b.size - a.size);
        return arr;
    }


    //endregion

    //region public methods

    //endregion

    //region private methods

    //endregion
}
