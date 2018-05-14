import * as React from "react";
import { View, TextInput, Button } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";
import MainScreen from "../MainScreen/MainScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { RegisterScreen } from "../RegisterScreen/RegisterScreen";
import { Authentication, IAuthInfo } from "../../backend/authentication/Authentication";


interface ILoginProperties {
    userCallback: (user: RNFirebase.UserCredential) => void;
}

interface ILoginState {
    submitted: boolean;
    register: boolean;
}

export default class LoginScreen extends React.Component<ILoginProperties, ILoginState> {

    auth;

    constructor(public props) {
        super(props);
        this.state = {
            submitted: false,
            register: false
        };

        this.auth = Authentication.instance;
        this.goRegister = this.goRegister.bind(this);
    }

    render() {
        if (this.state.register) {
            return <RegisterScreen userCallback={this.props.userCallback} />;
        }

        if (!this.state.submitted) {
            return (
                <View>
                    <TextInput placeholder="Email"></TextInput>
                    <TextInput placeholder="Password"></TextInput>
                    <Button title="Login" onPress={this.goLogin.bind(this)}></Button>
                    <Button title="Register" onPress={() => {this.goRegister(); }} />
                </View>

            );
        }

        return <LoadingScreen />;
    }

    goLogin() {

        console.log("LOGIN");

        const authInfo: IAuthInfo = {
            email: "evanreeves22@gmail.com",
            password: "password"
        };

        this.auth.onLogin(authInfo, this.props.userCallback);

        this.setState({ submitted: true, register: false });
    }

    goRegister() {

        this.setState({ submitted: false, register: true });
    }

}