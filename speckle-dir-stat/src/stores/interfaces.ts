import { Entity } from "./Entities";

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
