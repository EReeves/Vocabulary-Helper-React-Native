import firebase, { RNFirebase } from "react-native-firebase";
import { AsyncStorage } from "react-native";

export interface IAuthInfo {
    email: string;
    password: string;
}

export class Authentication {

    private static _instance: Authentication;
    public static instance(): Authentication {

        if (Authentication._instance === undefined) {
            this._instance = new Authentication();
        }
        return Authentication._instance;
    }

    private constructor() {}

    public user: RNFirebase.UserInfo;

    onLogin(state: IAuthInfo, userCallback: (user: RNFirebase.UserCredential) => void) {
        const { email, password } = state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the 
                // `onAuthStateChanged` listener we set up in App.js earlier
                console.log("Authenticated!");
                console.log(user);
                this.user = user.user;

                AsyncStorage.setItem("userData", JSON.stringify(user));

                userCallback(user);

            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    }

    onRegister(state: IAuthInfo, userCallback: (user: RNFirebase.UserCredential) => void) {
        const { email, password } = state;
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
                userCallback(user);
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    }
}