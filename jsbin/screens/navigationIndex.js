import { Navigation } from 'react-native-navigation';
//Screen imports
import MainScreen from './MainScreen/MainScreen';
export class NavigationIndex {
    // Register all screens of the app (including internal ones)
    registerScreens() {
        Navigation.registerComponent('screens.MainScreen', () => MainScreen);
    }
}
//# sourceMappingURL=NavigationIndex.js.map