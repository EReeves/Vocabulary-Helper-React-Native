export interface IMainState {
    flashMode: boolean;
    modeIcon: string;
    modeText: string;
    mutable: any;
    reveal: boolean;
    editMode: boolean;
}

// The different states the MainScreen can be in.
export class States {
    public static flashMode: IMainState = {
        flashMode: true,
        modeIcon: "tag",
        modeText: "Flashcard Mode",
        mutable: {},
        reveal: false,
        editMode: false
    };

    public static flashModeRevealed: IMainState = {
        flashMode: true,
        modeIcon: "tag",
        modeText: "Flashcard Mode",
        mutable: {},
        reveal: true,
        editMode: false
    };

    public static reviewMode: IMainState = {
        flashMode: false,
        modeIcon: "eye",
        modeText: "Review Mode",
        mutable: {},
        reveal: false,
        editMode: false
    };

    public static editMode: IMainState = {
        flashMode: false,
        modeIcon: "eye",
        modeText: "Review Mode",
        mutable: {headerTakeUpSpace: true},
        reveal: false,
        editMode: true
    };



    public static GetMode(isFlash: boolean): IMainState {
        return isFlash ? States.flashMode : States.reviewMode;
    }
}
