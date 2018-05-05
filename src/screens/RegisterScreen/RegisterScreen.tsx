import * as React from "react";
import { View, TextInput, Button } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";
import MainScreen from "../MainScreen/MainScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { Authentication, IAuthInfo } from "../../backend/authentication/Authentication";


interface IRegisterProperties {
    auth: Authentication;
    userCallback: (user: RNFirebase.UserCredential) => void;
}

interface IRegisterState {
    submitted: boolean;
    email: string;
    password: string;
}

export class RegisterScreen extends React.Component<IRegisterProperties, IRegisterState> {
    auth;

    constructor(public props) {
        super(props);
        this.state = {
            submitted: false,
            email: "",
            password: ""
        };
        this.auth = Authentication.instance();
    }

    render() {
        if (!this.state.submitted) {
            return (
                <View>
                    <TextInput placeholder="Email" onChangeText={(email) => this.setState({ email })} />
                    <TextInput placeholder="Password" onChangeText={(password) => this.setState({ password })} />
                    <Button title="Sign Up" onPress={this.goLogin.bind(this)}></Button>
                </View>

            );
        } else {
            return <LoadingScreen />;
        }
    }

    goLogin() {

        console.log("Register");

        const authInfo: IAuthInfo = {
            email: this.state.email,
            password: this.state.password
        };

        this.auth.onRegister(authInfo, this.props.userCallback);

        this.setState({ submitted: true, password: "" });
    }

}