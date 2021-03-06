import { AppRegistry } from "react-native";
import { Navigation } from "react-native-navigation";

import { NavigationIndex } from "./screens/NavigationIndex";
import palette from "./util/Palette";

export class App {
    navIndex: NavigationIndex;

    constructor() {
        this.navIndex = new NavigationIndex();
        this.navIndex.registerScreens();
        this.startApp();
    }

    // The index is basically just a big file that defines how the app behaves, mainly the react-native-navigation config.
    startApp() {
        Navigation.startSingleScreenApp({
            screen: {
                screen: "screens.StartScreen", // unique ID registered with Navigation.registerScreen
                title: "Login", // title of the screen as appears in the nav bar (optional)
                navigatorStyle: NavigationIndex.mainNavigatorStyle, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                orientation: "portrait",
            },
            appStyle: { orientation: "portrait"},

            drawer: {
                // optional, add this if you want a side menu drawer in your app
                left: {
                    // optional, define if you want a drawer from the left
                    screen: "screens.DrawerScreen", // unique ID registered with Navigation.registerScreen
                    disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
                    fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
                },
                disableOpenGesture: false, // optional, can the drawer, both right and left, be opened with a swipe instead of button
            },
            portraitOnlyMode: true,
            passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
            animationType: "slide-down", // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        } as any);
    }
}
