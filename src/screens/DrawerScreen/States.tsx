export interface IDrawerState {
    flashMode: boolean;
    modeIcon: string;
    modeText: string;
    mutable: any;
}

export class States {

    public static flashMode: IDrawerState = {
        flashMode: true,
        modeIcon: "tag",
        modeText: "Flashcard Mode",
        mutable: {}
    };

    public static reviewMode: IDrawerState = {
        flashMode: false,
        modeIcon: "eye",
        modeText: "Review Mode",
        mutable: {}
    };

    public static GetMode(isFlash: boolean): IDrawerState {
        return isFlash ? States.flashMode : States.reviewMode;
    }
}