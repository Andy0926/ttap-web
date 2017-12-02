import * as S from "string";
import {
    GetInitial
} from "../../helper";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class SearchSubjectList extends MasterStateAction {
    public constructor(private searchedText: string) {
        super();
    }
    public TypeName(): string {
        return "search subject list";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newSubjects = state
            .SubjectListState
            .Subjects
            .map((s) => {
                const stringToBeMatched = S((s.Code + s.Name + GetInitial(s.Name)).toLowerCase());
                return {
                    ...s,
                    IsVisible: (stringToBeMatched.contains(this.searchedText) ?
                        true :
                        false)
                };
            });
        const result: IMasterState = {
            ...state,
            SubjectListState: {
                ...state.SubjectListState,
                IsShowingSelectedSubjectOnly: false,
                SearchedText: this.searchedText,
                Subjects: newSubjects,
            }
        };
        return result;
    }
}
