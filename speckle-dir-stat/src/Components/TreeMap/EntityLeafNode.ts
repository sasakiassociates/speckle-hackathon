export type EntityTreeNode = {
    name: string;
    children: EntityTreeNode[] | EntityLeafNode[];
}

export type EntityLeafNode = {
    speckle_type: string;
    size: number;
    id: string;
}

