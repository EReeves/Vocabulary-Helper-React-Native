import * as React from "react";
import { View, AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
// Components to display when the user is LoggedIn and LoggedOut
// Screens for logged in/out - outside the scope of this tutorial
import MainScreen from "../MainScreen/MainScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

import { NavigationIndex } from "../NavigationIndex";

import { Authentication, IAuthInfo } from "../../backend/authentication/Authentication";

interface IStartProperties {
    navigator: any;
    loading: boolean;
    user: any;
}

interface IStartState {
    loading: boolean;
    user: any;
}

export default class StartScreen extends React.Component<IStartProperties, IStartState> {
    auth: Authentication;
    authSubscription: () => void;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: undefined
        };

        this.auth = Authentication.instance;
    }
    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged(userResult => {

            if (userResult !== null) {
                this.setState({
                    loading: false,
                    user: userResult,
                });
            }
            else {
                this.setState({
                    loading: false,
                    user: undefined
                });
            }

        });
    }
    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        // The application is initialising
        if (this.state.loading && !firebase.auth().currentUser) return <LoadingScreen />;

        // The user is an Object, so they're logged in
        if (firebase.auth().currentUser != null) {

            this.props.navigator.resetTo(NavigationIndex.getScreenConfig({ flashMode: false }, "screens.MainScreen", "Word Aboard"));
        }
        // The user is null, so they're logged out
        return <LoginScreen userCallback={(userResult) => { this.setState({ loading: false, user: userResult }); }} />;
    }
}
