import { Navigation } from 'react-native-navigation';
//Screen imports
import MainScreen from './MainScreen/MainScreen'
import DrawerScreen from "./DrawerScreen/DrawerScreen";

export class NavigationIndex {

    // Register all screens of the app (including internal ones)
    registerScreens() {
        Navigation.registerComponent('screens.MainScreen', () => MainScreen);
        Navigation.registerComponent('screens.DrawerScreen', () => DrawerScreen);
    } 
}

