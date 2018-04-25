import firebase, { RNFirebase } from "react-native-firebase";
import { AsyncStorage } from "react-native";

export interface IAuthInfo {
    email: string;
    password: string;
}

export class Authentication {

    onLogin(state: IAuthInfo, userCallback: (user: RNFirebase.UserCredential) => void) {
        const { email, password } = state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the 
                // `onAuthStateChanged` listener we set up in App.js earlier
                console.log("Authenticated!");
                console.log(user);

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

    onRegister(state: IAuthInfo) {
        const { email, password } = state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    }
}