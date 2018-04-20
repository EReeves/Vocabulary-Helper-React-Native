import { Navigation } from 'react-native-navigation';
import MainScreen from './MainScreen/MainScreen';
// register all screens of the app (including internal ones)
export default function registerScreens() {
    Navigation.registerComponent('screens.MainScreen', () => MainScreen);
}
//# sourceMappingURL=navigationIndex.js.map