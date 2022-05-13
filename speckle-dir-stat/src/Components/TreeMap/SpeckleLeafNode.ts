export type SpeckleTreeNode = {
    name: string;
    children: SpeckleTreeNode[] | SpeckleLeafNode[];
}

export type SpeckleLeafNode = {
    speckle_type: string;
    size: number;
    id: string;
}

