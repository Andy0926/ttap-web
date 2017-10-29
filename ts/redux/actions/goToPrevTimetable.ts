import {TimetableListStateActionGenerator} from "../reducers/timetableListState";
import {ITimetableListState} from "./../reducers/timetableListState";

export class GoToPrevTimetable extends TimetableListStateActionGenerator {
    public TypeName() : string {return "go to previous timetable"; }

    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        let newIndex = state.CurrentIndex - 1;
        if (newIndex < 0) {
            newIndex = state.Timetables.length - 1;
        }
        return {
            ...state,
            CurrentIndex: newIndex,
            CurrentTimetable: state.Timetables[newIndex]
        };
    }
}
