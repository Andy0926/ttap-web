import {TimetableListStateActionGenerator} from "../reducers/timetableListState";
import {ITimetableListState} from "./../reducers/timetableListState";

export class GoToNextTimetable extends TimetableListStateActionGenerator {
    public TypeName() : string {return "go to next timetable"; }

    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        let newIndex = state.CurrentIndex + 1;
        if (newIndex > state.Timetables.length - 1) {
            newIndex = 0;
        }
        return {
            ...state,
            CurrentIndex: newIndex,
            CurrentTimetable: state.Timetables[newIndex]
        };
    }
}