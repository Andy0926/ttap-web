import {
    saveAs
} from "file-saver";
import { ObjectStore } from "../../../dataStructure/objectStore";
import { IRawSlot } from "../../../model/rawSlot";
import { CreateSlotViewModels } from "../../../model/slotViewModel";
import {
    Timetable
} from "./../../../model/timetable";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsTextFile extends SaveTimetable {
    protected Save(timetable: Timetable, rawSlotStore: ObjectStore<IRawSlot>) {
        const rawSlots = rawSlotStore.GetBunch(timetable.Uids);
        const data = new TimetableSummary(CreateSlotViewModels(rawSlots)).ToString();
        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }

    protected SaveType(): string {
        return "text file";
    }
}
