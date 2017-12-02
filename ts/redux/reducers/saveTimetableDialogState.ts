import * as typeName from "type-name";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";

export interface ISaveTimetableDialogState {
    IsMainDialogOpen: boolean;
    IsGetDateDialogOpen: boolean;
}

export function NewSaveTimetableDialogState(): ISaveTimetableDialogState{
    return {
        IsMainDialogOpen: false,
        IsGetDateDialogOpen: false
    };
}

export abstract class SaveTimetableDialogStateAction extends Action < ISaveTimetableDialogState > {
    public StateName() {
        return typeName(NewSaveTimetableDialogState());
    }
}

export const SaveTimetableDialogStateReducer = GenereteReducer(NewSaveTimetableDialogState());
