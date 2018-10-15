const concat = require("lodash.concat");
const sortBy = require("lodash.sortby");
import {RawSlot} from "../model/rawSlot";
import {Timetable} from "../model/timetable";
import {ParseRawSlotToSlot} from "../parser/parseRawSlotToSlot";
import {ParseSlotToBigSlot} from "../parser/parseSlotToBigSlot";
import {ParseSlotToTinySlot} from "../parser/parseSlotToTinySlot";
import {BoundedInt} from "./boundedInt";
import { FindTimetableVisualizer, NullFindTimetableVisualizer } from "./findTimetableVisualizer";
import {GenerateIndices} from "./generateIndices";
import {Increment} from "./increment";
import {Partitionize} from "./partitionize";
import {Append, GotIntersection} from "./state";
import {IOptimizedSlot} from "./tinySlot";

interface ISnapshot {
    SlotIds : number[];
    State : number[];
}

const LIMIT = 1000000;
export function FindTimetable(
    input : IOptimizedSlot[],
    visualizer?: FindTimetableVisualizer<IOptimizedSlot>
) : Timetable[] {
    if (!visualizer) {
        visualizer = new NullFindTimetableVisualizer();
    }
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    if (input.length === 1) {
        let resultState = [ 0, 0, 0, 0, 0, 0, 0 ];
        resultState = Append(resultState, input[0].State);
        return [new Timetable(input[0].SlotIds, resultState)];
    }
    const result = new Array < Timetable > ();
    const partitioned = sortBy(Partitionize(input), ["length"]) as IOptimizedSlot[][];
    visualizer.plotPartition(partitioned, partitioned.map((x) => x[0].PartitionGroup));
    const indices = GenerateIndices(partitioned);
    const length = indices.length;
    const last = length - 1;
    let current : IOptimizedSlot;
    const snapshots = new Array < ISnapshot > ();
    snapshots.push({
        SlotIds: [],
        State: [ 0, 0, 0, 0, 0, 0, 0 ] // 7 because there are 7 days in a week
    });
    let prevSnapshot : ISnapshot;
    let ptr = 0;
    while (true) {
        prevSnapshot = snapshots[ptr];
        current = partitioned[ptr][indices[ptr].Value];
        if (ptr > 0) { // this block is for plotting edge
            const prevPtr = ptr - 1;
            const previousSlot = partitioned[prevPtr][indices[prevPtr].Value];
            visualizer.connect(previousSlot, current);
        }
        if (!GotIntersection(current.State, prevSnapshot.State)) {
            snapshots.push({
                SlotIds: concat(current.SlotIds, prevSnapshot.SlotIds),
                State: Append(current.State, prevSnapshot.State) // concat(current.State, prevSnapshot.State)
            });
            if (ptr === last) {
                result.push(new Timetable(snapshots[ptr + 1].SlotIds, snapshots[ptr + 1].State));
                if (result.length >= LIMIT) { // if too much timetable just return the result
                    return result;
                }
                snapshots.pop();
                while (true) {
                    indices[ptr].Value++;
                    if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                        break;
                    } else {
                        indices[ptr].Value = 0;
                        snapshots.pop();
                        if (ptr === 0) {
                            visualizer.animate();
                            return result;
                        }
                        ptr--;
                    }
                }
            } else {
                ptr++;
            }
        } else {
            while (true) {
                indices[ptr].Value++;
                if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                    break;
                } else {
                    indices[ptr].Value = 0;
                    snapshots.pop();
                    if (ptr === 0) {
                        visualizer.animate();
                        return result;
                    }
                    ptr--;
                }
            }
        }
    }
}

export function FindTimetableWithoutConsideringWeekNumber(
    rawSlots : RawSlot[],
    visualizer?: FindTimetableVisualizer<IOptimizedSlot>
) : Timetable[] {
    return FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots)), visualizer);
}

export function FindTimetableByConsideringWeekNumber(
    rawSlots : RawSlot[],
    visualizer?: FindTimetableVisualizer<IOptimizedSlot>
) : Timetable[] {
    return FindTimetable(ParseSlotToBigSlot(ParseRawSlotToSlot(rawSlots)), visualizer);
}
