import {
    RawSlot
} from "./rawSlot";

export class SubjectSchema {
    public GotLecture: boolean;
    public GotPractical: boolean;
    public GotTutorial: boolean;
    public SubjectCode: string;

    public constructor(gotLecture = false, gotTutorial = false, gotPractical = false) {
        this.GotLecture = gotLecture;
        this.GotTutorial = gotTutorial;
        this.GotPractical = gotPractical;
    }

    public IsEqual(other: SubjectSchema): boolean {
        return this.SubjectCode === other.SubjectCode &&
            this.GotLecture === other.GotLecture &&
            this.GotTutorial === other.GotTutorial &&
            this.GotPractical === other.GotPractical;
    }
}

export function GenerateSubjectSchema(slotIds: number[]): SubjectSchema {
    const slots = RawSlot.GetBunch(slotIds);
    const subjectCode = slots[0].SubjectCode;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].SubjectCode !== subjectCode) {
            throw new Error("Not all of the slots passed in are from the same subject.");
        }
    }
    const result = new SubjectSchema();
    result.SubjectCode = subjectCode;
    slots.forEach((s) => {
        switch (s.Type) {
            case "L":
                result.GotLecture = true;
                break;
            case "T":
                result.GotTutorial = true;
                break;
            case "P":
                result.GotPractical = true;
                break;
        }
    });
    return result;
}
