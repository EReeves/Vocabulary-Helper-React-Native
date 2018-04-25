import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";
import { NavigationIndex } from "../NavigationIndex";


export class DrawerRouter {


    logOut(navigator) {

        console.log("LOGOUT");

        firebase.auth().signOut().then(function () {
            
            navigator.resetTo(NavigationIndex.getScreenConfig({ }, "screens.StartScreen", "Login"));

        }, function (error) {
            // An error happened.
            navigator.resetTo(NavigationIndex.getScreenConfig({}, "screens.StartScreen", "Login"));
        });
    }
}