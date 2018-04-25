import * as React from "react";
import { View, TextInput, Button } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";
import MainScreen from "../MainScreen/MainScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { Authentication, IAuthInfo } from "../../backend/authentication/Authentication";


interface ILoginProperties {
    auth: Authentication;
    userCallback: (user: RNFirebase.UserCredential) => void;
}

interface ILoginState {
    submitted: boolean;
}

export default class LoginScreen extends React.Component<ILoginProperties, ILoginState> {

    constructor(public props) {
        super(props);
        this.state = {
            submitted: false
        };
    }

    render() {
        if (!this.state.submitted) {
            return (
                <View>
                    <TextInput placeholder="Email"></TextInput>
                    <TextInput placeholder="Password"></TextInput>
                    <Button title="Login" onPress={this.goLogin.bind(this)}></Button>
                </View>

            );
        } else {
            return <LoadingScreen/>;
        }
    }

    goLogin() {

        console.log("LOGIN");

        const authInfo: IAuthInfo = {
            email: "evanreeves22@gmail.com",
            password: "password"
        };

        this.props.auth.onLogin(authInfo, this.props.userCallback);

        this.setState({submitted: true});
    }

}