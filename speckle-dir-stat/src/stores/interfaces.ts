export interface TreeNode {
    id: string;
    parent?: string;
    category?: string;
    color?: string;
    selected?: boolean;
    area: number;
    value?: number;
    label?: string[];
    total?: number;
}

export type EntityDot = {
    x: number;
    y: number;
    id: string;
    value: number;
    category?: string;
    color?: string;
    selected?: boolean;
}
