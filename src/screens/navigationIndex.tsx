import { Navigation } from "react-native-navigation";
//Screen imports
import MainScreen from "./MainScreen/MainScreen";
import DrawerScreen from "./DrawerScreen/DrawerScreen";
import ListScreen from "./ListScreen/ListScreen";
import StartScreen from "./StartScreen/StartScreen";
import { App } from "../App";
import palette from "../util/Palette"

export class NavigationIndex {
          // Register all screens of the app (including internal ones)
          registerScreens() {
             Navigation.registerComponent("screens.MainScreen", () => MainScreen);
             Navigation.registerComponent("screens.DrawerScreen", () => DrawerScreen);
             Navigation.registerComponent("screens.ListScreen", () => ListScreen);
             Navigation.registerComponent("screens.StartScreen", () => StartScreen);
          }

          public static MainScreenConfig(props) {
             return { screen: "screens.MainScreen", title: "Vocabulary Helper", navigatorStyle: App.NavigtorStyle, passProps: props };
          }

          public static ListScreenConfig(props) {
             return { screen: "screens.ListScreen", title: "Search", tintColor: palette.White, navigatorStyle: App.NavigtorStyle, passProps: props };
          }
       }
