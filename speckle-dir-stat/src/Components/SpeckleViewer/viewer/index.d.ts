/**
 * In the future we can integrate these types into the actual viewer package
 */

type Predicate = (value: any) => boolean;

type Interactions = {
    deselectObjects();
    zoomToMatchingObject(predicate: Predicate);
    selectObjects(predicate: Predicate);
}

declare class Viewer {
    constructor(params: {
        container: Node
        postprocessing?: boolean;
        reflections?: boolean;
        showStats?: boolean;
    })

    async applyFilter(filter : any) : void

    getObjectsProperties(includeAll = true): any;

    allObjects: any[];

    async loadObject(url: string, token?: string, enableCaching? = true): Promise<void>

    onWindowResize(): void

    on<A1 = unknown, A2 = unknown, A3 = unknown>(
        event: string,
        callback: (arg1: A1, arg2: A2, arg3: A3) => void
    )

    interactions: Interactions
}

export {Viewer}
