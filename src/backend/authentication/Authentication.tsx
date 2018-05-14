import firebase, { RNFirebase } from "react-native-firebase";
import { AsyncStorage } from "react-native";

export interface IAuthInfo {
    email: string;
    password: string;
}

export class Authentication {

    private static _instance: Authentication;
    public static get instance(): Authentication {
        return Authentication._instance || (Authentication._instance = new Authentication());
    }

    public static user(): RNFirebase.User {
        return firebase.auth().currentUser;
    }

    onLogin(state: IAuthInfo, userCallback: (userResult: RNFirebase.UserCredential) => void) {
        const { email, password } = state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((userResult) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the 
                // `onAuthStateChanged` listener we set up in App.js earlier

                AsyncStorage.setItem("userData", JSON.stringify(userResult));

                userCallback(userResult);

            })
            .catch((error) => {
                const { code, message } = error;
                console.log(code, message);
            });
    }

    onRegister(state: IAuthInfo, userCallback: (userResult: RNFirebase.UserCredential) => void) {
        const { email, password } = state;
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((userResult) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
                userCallback(userResult);
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(code, message);
            });
    }

    
}