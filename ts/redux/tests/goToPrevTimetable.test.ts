import {expect} from "chai";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import {TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";

describe("goToPrevTimetable action", () => {

    it("'s name shold be 'go to previous timetable'", () => {
        expect(new GoToPrevTimetable().TypeName())
            .to
            .eq("go to previous timetable");
    });

    it("decrement the current index", () => {
        const initialState = new TimetableListState([null, null]);
        initialState.CurrentIndex = 1;
        const newState = TimetableListStateReducer(initialState, new GoToPrevTimetable().Action());
        expect(newState.CurrentIndex)
            .to
            .eq(0);
    });

    it("decrement the current index cyclically", () => {
        const initialState = new TimetableListState([null, null, null]);
        const newState = TimetableListStateReducer(initialState, new GoToPrevTimetable().Action());
        expect(newState.CurrentIndex)
            .to
            .eq(2);
    });

    it("should set the CurrentTimetable property", () => {
        const initialState = new TimetableListState([undefined, null]);
        const newState = TimetableListStateReducer(initialState, new GoToPrevTimetable().Action());
        expect(initialState.CurrentTimetable)
            .to
            .eq(undefined);
        expect(newState.CurrentTimetable)
            .to
            .eq(null);
    });

});
