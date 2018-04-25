import { Navigation } from "react-native-navigation";
// Screen imports
import MainScreen from "./MainScreen/MainScreen";
import DrawerScreen from "./DrawerScreen/DrawerScreen";
import ListScreen from "./ListScreen/ListScreen";
import StartScreen from "./StartScreen/StartScreen";
import { App } from "../App";
import palette from "../util/Palette";
import { navigatorStyle } from "./NavigationStyle";

export class NavigationIndex {

    // Register all screens of the app (including internal ones)
    registerScreens() {
        Navigation.registerComponent("screens.MainScreen", () => MainScreen);
        Navigation.registerComponent("screens.DrawerScreen", () => DrawerScreen);
        Navigation.registerComponent("screens.ListScreen", () => ListScreen);
        Navigation.registerComponent("screens.StartScreen", () => StartScreen);
    }

    // Main Navigator Style
    public static mainNavigatorStyle = navigatorStyle;

    // Gets the configurations for different screens, passed in to the navigator when pop/push screens etc.

    public static getScreenConfig(props: {}, screenName: string, titleString: string) {
        return { screen: screenName, title: titleString, tintColor: palette.White, navigatorStyle: this.mainNavigatorStyle, passProps: props };
    }
}
