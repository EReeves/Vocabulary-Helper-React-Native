export interface IMainState {
   flashMode: boolean;
   modeIcon: string;
   modeText: string;
   mutable: any;
   reveal: boolean;
}

export class States {
          public static FlashMode: IMainState = { flashMode: true, modeIcon: "tag", modeText: "Flashcard Mode", mutable: {}, reveal: false };

          public static FlashModeRevealed: IMainState = { flashMode: true, modeIcon: "tag", modeText: "Flashcard Mode", mutable: {}, reveal: true };

          public static ReviewMode: IMainState = { flashMode: false, modeIcon: "eye", modeText: "Review Mode", mutable: {}, reveal: false };

          public static GetMode(isFlash: boolean): IMainState {
             return isFlash ? States.FlashMode : States.ReviewMode;
          }
       }
