import {
    GenerateTotalState
} from "../../model/states/generateTotalState";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class UpdateTotalState extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "update total state";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                ClickedTimeConstraint: [0, 0, 0, 0, 0, 0, 0],
                UidsOfClickedState: [],
                TotalState: GenerateTotalState(state.TimetableListState.FiltrateTimetables, [])
            }
        };
    }
}
