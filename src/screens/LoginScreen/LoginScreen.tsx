import * as React from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "react-native-firebase";
import MainScreen from "../MainScreen/MainScreen"

interface ILoginProperties {

}

export default class LoginScreen extends React.Component<{}, ILoginProperties> {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View>
                <TextInput placeholder="Email"></TextInput>
                <TextInput placeholder="Password"></TextInput>
                <Button title="Login" onPress={() => { }}></Button>
            </View>

        );
    }

}