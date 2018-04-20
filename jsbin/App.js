import { Navigation } from "react-native-navigation";
import { NavigationIndex } from "./screens/NavigationIndex";
import palette from "./util/Palette";
export class App {
    constructor() {
        let navIndex = new NavigationIndex();
        navIndex.registerScreens();
        this.startApp();
    }
    //The index is basically just a big file that defines how the app behaves, mainly the react-native-navigation config.
    startApp() {
        const nStyle = {
            statusBarColor: palette.BackgroundDark,
            navBarTextColor: palette.White,
            navBarBackgroundColor: palette.BackgroundDark,
            drawUnderNavBar: false,
            navBarTranslucent: false,
            header: {
                visible: false,
            },
            tabBarBackgroundColor: palette.BackgroundDark,
            tabBarButtonColor: palette.BackgroundLight,
            tabBarHideShadow: true,
            tabBarSelectedButtonColor: palette.White,
        };
        Navigation.startSingleScreenApp({
            screen: {
                screen: "screens.MainScreen",
                title: "Vocabulary Helper",
                navigatorStyle: nStyle,
                navigatorButtons: {},
            },
            drawer: {
                // optional, add this if you want a side menu drawer in your app
                left: {
                    // optional, define if you want a drawer from the left
                    screen: "screens.MainScreen",
                    disableOpenGesture: false,
                    fixedWidth: 500,
                },
                disableOpenGesture: false,
            },
            passProps: {},
            animationType: "slide-down",
        });
    }
}
//# sourceMappingURL=App.js.map