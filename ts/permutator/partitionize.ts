import {
    sortBy
} from "lodash";
export interface IPartitionable {
    PartitionKey: number;
}

export function Partitionize(input: IPartitionable[]): IPartitionable[][] {
    const result = new Array < IPartitionable[] > ();
    let column = new Array < IPartitionable > ();
    const copy = sortBy(input, ["PartitionKey"]);
    column.push(copy[0]);
    let currentKey = copy[0].PartitionKey;
    for (let i = 1; i < copy.length; i++) {
        if (copy[i].PartitionKey === currentKey) {
            column.push(copy[i]);
        } else {
            currentKey = copy[i].PartitionKey;
            result.push(column.slice());
            column = [];
            column.push(copy[i]);
        }
        if (i === copy.length - 1) {
            result.push(column);
        }
    }
    return result;
}
