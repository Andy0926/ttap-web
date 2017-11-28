import {
    expect
} from "chai";
import {
    connect
} from "react-redux";
import {
    ITimetableListViewDispatchProps,
    ITimetableListViewStateProps,
    TimetableListView
} from "../../react/timetableListView";
import {
    GoToRandomTimetable
} from "../actions/goToRandomTimetable";
import {
    SaveTimetableAsImage
} from "../actions/saveTimetable/saveTimetableAsImage";
import {
    SaveTimetableAsTextFile
} from "../actions/saveTimetable/saveTimetableAsTextFile";
import {
    TimetableListStateAction
} from "../reducers/timetableListState";
import {
    STCBox
} from "./../../model/states/stcBox";
import {
    CloseSaveDialog
} from "./../actions/closeSaveDialog";
import {
    DefilterTimetable
} from "./../actions/defilterTimetable";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    GoToPrevTimetable
} from "./../actions/goToPrevTimetable";
import {
    OpenSaveDialog
} from "./../actions/openSaveDialog";
import {
    SaveTimetableAsGoogleCalendar
} from "./../actions/saveTimetable/saveTimetableAsGoogleCalendar";
import {
    ToggleSetTimeConstraintView
} from "./../actions/toggleSetTimeConstraintView";
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";
import {
    UpdateTimetableListState
} from "./../actions/updateTimetableListState";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";
import {
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";
import {
    TimetableListState
} from "./../reducers/timetableListState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState.TimetableListState as TimetableListState;
    return {
        isSaveDialogOpen: target.IsSaveDialogOpen,
        currentIndex: target.CurrentIndex,
        currentTimetable: target.FiltrateTimetables[target.CurrentIndex],
        maxIndex: target.FiltrateTimetables.length - 1,
        totalState: target.TotalState,
        isSetTimeConstraintViewOpen: target.IsSetTimeConstraintViewOpen,
        numberOfRemovedTimetables: target.ResidueTimetables.length,
        numberOfRemainingTimetables: target.FiltrateTimetables.length
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(Wrap(new GoToNextTimetable())),
        handleGoToRandom: () => dispatch(Wrap(new GoToRandomTimetable())),
        handleGoToPrevious: () => dispatch(Wrap(new GoToPrevTimetable())),
        handleSaveAsTextFile: () => {
            dispatch(Wrap(new SaveTimetableAsTextFile()));
        },
        handleSaveAsPicture: () => {
            dispatch(Wrap(new SaveTimetableAsImage()));
        },
        handleSaveToGoogleCalendar: () => {
            dispatch(Wrap(new SaveTimetableAsGoogleCalendar()));
        },
        handleOpenSaveDialog: () => {
            dispatch(Wrap(new OpenSaveDialog()));
        },
        handleCloseSaveDialog: () => {
            dispatch(Wrap(new CloseSaveDialog()));
        },
        handleOpenSetTimeConstraintView: () => {
            dispatch(Wrap(new UpdateTotalState()));
            dispatch(Wrap(new ToggleSetTimeConstraintView(true)));
        },
        handleCloseSetTimeConstraintView: () => {
            dispatch(Wrap(new ToggleSetTimeConstraintView(false)));
        },
        handleSetTimeConstraintAt: (state: STCBox) => {
            dispatch(Wrap(new FilterTimetable(state)));
        },
        handleDesetTimeConstraintAt: (state: STCBox) => {
            dispatch(Wrap(new DefilterTimetable(state)));
        }
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);

const Wrap = (action: TimetableListStateAction): any => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action)).Action();
};
